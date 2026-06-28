import { chromium } from "playwright-core";

const baseURL = process.env.QC_BASE_URL || "http://127.0.0.1:3200";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: chrome, headless: true });
const context = await browser.newContext();
const page = await context.newPage();
page.setDefaultTimeout(30_000);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function open(path, viewport = { width: 1440, height: 1000 }) {
  await page.setViewportSize(viewport);
  const response = await page.goto(`${baseURL}${path}`, { waitUntil: "domcontentloaded" });
  assert(response?.ok(), `${path} returned ${response?.status()}`);
  // Let client components hydrate before interaction. A cold Vercel deployment
  // can deliver HTML materially earlier than its client chunks.
  await page.waitForTimeout(1_000);
}

async function assertNoHorizontalOverflow(path, viewport) {
  await open(path, viewport);
  const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  assert(dimensions.scroll <= dimensions.viewport + 1, `${path} overflows horizontally: ${dimensions.scroll}px > ${dimensions.viewport}px`);
}

try {
  await open("/");
  await page.locator(".dh-hero h1").waitFor();

  await open("/bikes");
  assert(await page.locator("#catalogue-filters").count() === 0, "Filters open by default");
  await page.getByTestId("filter-trigger").click();
  await page.locator("#catalogue-filters").waitFor();
  await page.locator("#catalogue-filters button[aria-label='Close filters']").click();
  assert(await page.locator("#catalogue-filters").count() === 0, "Filter close button failed");
  await page.getByTestId("filter-trigger").click();
  await page.keyboard.press("Escape");
  assert(await page.locator("#catalogue-filters").count() === 0, "Escape did not close filters");

  await open("/cart");
  await page.locator(".qty").first().locator("button").last().click();
  assert((await page.locator(".qty span").first().textContent()) === "3", "Cart quantity control failed");

  await open("/account");
  await page.getByRole("button", { name: /Address/ }).click();
  assert(await page.locator(".saved-address").count() === 4, "Account address tab failed");

  await open("/search");
  await page.locator(".design-search > input").fill("not-a-real-bike");
  await page.locator(".no-results").waitFor();

  await open("/login");
  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByPlaceholder("Name").waitFor();

  await open("/test-ride");
  await page.getByRole("button", { name: "Get OTP" }).click();
  await page.locator(".store-card").first().getByRole("button", { name: "Select store" }).click();
  await page.locator(".calendar").waitFor();

  const mobile = { width: 390, height: 844 };
  for (const path of ["/", "/bikes", "/bikes/x1", "/cart", "/account", "/search", "/login", "/test-ride"]) {
    await assertNoHorizontalOverflow(path, mobile);
  }
  await open("/bikes", mobile);
  await page.getByTestId("filter-trigger").click();
  await page.locator("#catalogue-filters").waitFor();
  const filterBox = await page.locator("#catalogue-filters").boundingBox();
  assert(filterBox && filterBox.width <= 390, "Mobile filter drawer exceeds viewport");
  await page.locator("#catalogue-filters .apply-filters").click();

  await open("/", mobile);
  await page.locator(".menu-button").click();
  await page.locator(".nav.open").waitFor();

  await open("/studio", { width: 1600, height: 1000 });
  assert(await page.locator("body > header:visible").count() === 0, "Storefront header visible inside CMS");
  assert(await page.locator(".global-join:visible, .footer:visible").count() === 0, "Storefront footer visible inside CMS");
  const headline = `QC preview ${Date.now()}`;
  await page.getByTestId("hero-headline").fill(headline);
  const frame = page.frameLocator("iframe[title='Live storefront preview']");
  await frame.locator(".dh-hero h1").filter({ hasText: headline }).waitFor();
  await page.locator(".upload input[type='file']").setInputFiles({
    name: "qc-image.png",
    mimeType: "image/png",
    buffer: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64"),
  });
  await frame.locator(".dh-hero > img").waitFor();
  await page.getByTestId("publish-content").click();
  const storefront = await context.newPage();
  await storefront.goto(baseURL, { waitUntil: "domcontentloaded" });
  await storefront.locator(".dh-hero h1").filter({ hasText: headline }).waitFor();
  await storefront.close();
  await page.getByRole("button", { name: "Reset defaults" }).click();

  console.log("QC PASS: desktop, mobile, filters, commerce, account, auth, test ride, CMS preview and publish");
} catch (error) {
  await page.screenshot({ path: "/tmp/emotorad-qc-failure.png", fullPage: true }).catch(() => {});
  console.error(`QC FAIL: ${error.message}`);
  process.exitCode = 1;
} finally {
  await browser.close();
}
