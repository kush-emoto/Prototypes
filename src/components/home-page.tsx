"use client";

import Link from "next/link";
import { useContent } from "@/context/content-context";
import { formatPrice, products } from "@/data/products";

const honestCards = [
  ["↯", "They need charging", "Yes, electric cycles need charging, just like your phone. That’s why we made charging effortless with a removable battery."],
  ["⬡", "Heavier than normal cycles", "Yes, the battery adds weight. But once the motor kicks in, you won’t feel it—the power works with you, not against you."],
  ["⌖", "Range anxiety is real", "‘Will I make it?’ is why we over-deliver on range and give you real-world numbers you can trust."],
  ["₹", "Upfront cost is higher", "Yes, they cost more upfront than regular bicycles. But you save thousands every year on fuel and maintenance."],
];

const faqs = [
  ["What is an E Cycle?", "An e-cycle is a regular bicycle supported by a quiet electric motor when you need it."],
  ["How do electric cycles work?", "Pedal assistance adds power while you ride, with selectable support levels."],
  ["What is the average speed of electric cycles?", "EMotorad road-legal models provide assistance up to 25 km/h."],
  ["What is the average range of e-cycles?", "Range varies by model, terrain and assistance level; our models are designed for everyday commutes."],
  ["How much time does it take to charge an e-bike?", "Most batteries charge in roughly three to five hours."],
  ["Are electric cycles waterproof?", "They are designed for everyday weather, but electrical parts should not be submerged."],
];

const press = ["INDIAN EXPRESS", "BUSINESS INSIDER", "afaqs!", "FINANCIAL EXPRESS", "FORBES", "NEWS18", "THE TIMES OF INDIA", "YOURSTORY"];

export function HomePage() {
  const { content, market } = useContent();
  const primary = products[1];
  return (
    <div className="design-home">
      <section className="dh-hero">
        <video src={content.hero.mediaUrl} autoPlay muted loop playsInline />
        <div className="dh-overlay" />
        <div className="dh-hero-copy">
          <h1>{content.hero.title}</h1>
          <p>{content.hero.subtitle}</p>
          <div className="dh-actions"><Link href="/bikes" className="pill white">Explore all models</Link><Link href="/test-ride" className="pill ghost">Book test ride</Link></div>
        </div>
        <div className="dh-stats"><span>♧ <b>50k+</b> Happy Riders</span><span>₹ <b>2.5Cr+</b> in Fuel Savings</span><span>◉ <b>300</b> Tons of CO2 Reduced</span><span>⌖ <b>150+</b> Cities Nationwide</span></div>
      </section>

      <section className="dh-offerings">
        <article><img src={products[1].image} alt="Electric bike"/><div><h3>Electric <em>Bikes</em></h3><small>Starting at</small><strong>{formatPrice(59999, market)}</strong><Link href="/bikes">Explore Models <i>→</i></Link></div></article>
        <div className="dh-offerings-title"><img src="/emotorad-logo.png" alt="EMotorad"/><h2>Two<br/>revolutionary<br/>Core<br/>Offerings</h2><Link className="pill dark" href="/bikes">Explore the entire range →</Link></div>
        <article className="cycle"><img src={products[2].image} alt="Electric cycle"/><div><h3>Electric <em>Cycles</em></h3><small>Starting at</small><strong>{formatPrice(19999, market)}</strong><Link href="/bikes">Explore Models <i>→</i></Link></div></article>
      </section>

      <section className="dh-real-india">
        <img src="/real-india.jpg" alt="An EMotorad rider in India"/>
        <div><h2>We make electric cycles<br/>in India for real India.</h2><p>EMotorad didn’t start in a boardroom. It started in traffic, watching fuel prices rise and wondering why daily travel had to be so difficult. So we built electric cycles for real city roads, real weather, and real budgets.<br/><br/>No compromises. No surprises.<br/><br/>Because everyone deserves a commute that works for them.</p><Link className="pill white" href="/bikes">See how they work →</Link></div>
      </section>

      <section className="dh-explainer">
        <h2>Wait, what&apos;s an electric cycle/bike?</h2><p>A smarter cycle with electric support when you need it. Less fuel, less sweat, better commutes.</p><div className="segmented"><button>Electric Bike</button><button>Electric Cycle</button></div>
        <div className="dh-three"><div><strong>Zero Emissions</strong><span>Every ride means one less polluting vehicle on the road.</span></div><div><strong>₹2/day to Commute</strong><span>Charge overnight for just ₹15, compared to ₹200+ on petrol.</span></div><div><strong>Pedal + Power</strong><span>Choose how much effort you want to put in. The motor assists when you need it.</span></div></div>
        <img src={products[1].image} alt="EMotorad electric bike"/>
      </section>

      <section className="dh-honest">
        <h2>Electric cycles aren&apos;t perfect.<br/>And we&apos;re honest about it.</h2><p>A smarter cycle with electric support when you need it. Less fuel, less sweat, better commutes.</p>
        <div>{honestCards.map(([icon,title,body], index)=><article key={title} style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.82),rgba(0,0,0,.25)),url(${products[index % products.length].banner})`}}><i>{icon}</i><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="dh-savings">
        <header><h2>Ride More. Save More.</h2><p>See how much you save every month by switching to an electric cycle.</p></header>
        <div className="savings-panel"><div className="savings-left"><div className="slider-label"><strong>Daily Commute Distance</strong><b>35 km/day</b></div><div className="fake-slider"><i/><span>1 km</span><span>75 km</span></div><small>Calculated based on Petrol @ ₹100/L</small><p>Recommended Cycles for you</p><div className="mini-products">{products.slice(0,3).map(p=><Link href={`/bikes/${p.slug}`} key={p.slug}><img src={p.image} alt={p.name}/><b>{p.name}</b><small>{formatPrice(p.price,market)}</small></Link>)}</div><Link href="/bikes" className="pill white">Explore All Models →</Link></div><div className="saving-results"><article className="wide"><span>Total Yearly Savings</span><strong>₹34,935</strong><small>Enough for a weekend getaway</small></article><article><span>▣<small>Monthly Savings</small></span><strong>₹2,520</strong></article><article><span>◯<small>Fuel Avoided</small></span><strong>434 <i>Liters</i></strong></article><article><span>♧<small>CO2 Reduced</small></span><strong>1,054 <i>kg</i></strong></article><article><span>♤<small>Trees Equivalent</small></span><strong>54 <i>Trees</i></strong></article></div></div>
      </section>

      <section className="dh-advantage">
        <img className="adv-logo" src="/emotorad-logo.png" alt="EMotorad"/><h2>The E Motorad advantage</h2><p>Built for seamless, worry-free rides.</p><div><article><i>⬡</i><strong>2-Year Warranty</strong><span>Complete bike coverage for worry-free rides.</span></article><article><i>♧</i><strong>Free Delivery</strong><span>Pan-India doorstep delivery, easy setup.</span></article><article><i>◉</i><strong>24/7 Support</strong><span>Expert support, always a call away.</span></article><article><i>♙</i><strong>Certified Quality</strong><span>ISO-certified quality built to global standards.</span></article></div>
      </section>

      <section className="dh-record"><div className="record-badge">RECORD <b>◎</b> HOLDER</div><h2>We Don&apos;t Just Build E-Cycles,<br/>We Build a Better India</h2><p>Largest electric bicycle delivery in Kuppam, in partnership with the Kuppam Area<br/>Development Authority, IIT Kanpur, and the Chittoor District</p><img src="/record-team.jpg" alt="EMotorad Guinness record team"/></section>

      <section className="dh-famous"><h2>India’s Biggest Names on an</h2><img src="/emotorad-logo.png" alt="EMotorad"/><div>{products.concat(products).slice(0,8).map((p,i)=><article key={i}><img src={i%2?p.banner:p.image} alt="EMotorad community"/><span>EMotorad Rider<small>Indian Icon</small></span></article>)}</div></section>

      <section className="dh-social"><h2>We’re Everywhere You Are</h2><div className="social-pills"><span>@e_motorad ◎</span><span>@e_motorad ▶</span><span>@e_motorad f</span><span>@e_motorad in</span></div><div className="social-strip">{products.concat(products).slice(0,7).map((p,i)=><img key={i} src={i%2?p.banner:p.image} alt="EMotorad social story"/>)}<div className="phone"><video src="/homepage-hero.mp4" autoPlay muted loop playsInline/></div></div></section>

      <section className="dh-testimonials"><header><h2>Real people. Real lives.<br/>Real impact.</h2><Link className="pill white" href="#stories">View Rider Stories →</Link></header><div>{["I used to spend ₹4,000 on fuel every month. Now I spend hardly anything and enjoy every ride.","Switching to electric bikes saved me ₹5,500 monthly, and I never worry about pollution.","Charging my e-bike costs less than ₹50 a week, and I’ve cut down on maintenance expenses."].map((quote,i)=><article key={quote}>{i===1&&<img src={products[1].banner} alt="Rider story"/>}<span>★★★★★</span><p>“{quote}”</p><strong>{["Arvind Satkar","Neha Sharma","Priya Nair"][i]}</strong><small>{["Hyderabad","Bangalore","Chennai"][i]}</small></article>)}</div></section>

      <section className="dh-people"><h2>Real Cycles Built by<br/>Real People.</h2><div><article><h3>Suman Mishra</h3><small>QUALITY CHECK TECHNICIAN</small><p>“My son asked me what I do at work. I showed him a video of our cycle on the road. He said—Maa, you made that? That was enough for me.”</p></article><img src="/team-story.jpg" alt="EMotorad team member"/><article><h3>Suman Mishra</h3><small>QUALITY CHECK TECHNICIAN</small><p>“Every cycle carries the care of the people who built it. That is what quality means to us.”</p></article><img src="/team-story.jpg" alt="EMotorad quality team"/></div><Link className="pill dark" href="#team">Meet the Team →</Link></section>

      <section className="dh-press"><h2>Apparently, We’re Kind of a Big Deal</h2><div>{press.map(item=><strong key={item}>{item}</strong>)}</div><Link className="pill dark" href="#press">View Media Features →</Link></section>

      <section className="dh-product-explorer"><h2>Explore our products</h2><div className="explorer-head"><div><h3>{primary.name} <small>★ 4.8</small></h3><p>⚡ {primary.range}　↕ 5&apos;0&quot;–6&apos;0&quot;　▰ 4–5 hrs</p></div><div><span><del>{formatPrice(primary.compareAt??primary.price,market)}</del> {formatPrice(primary.price,market)}</span><small>EMI from ₹3,000/month</small><Link className="pill dark" href="/cart">Add to cart →</Link></div></div><div className="explorer-bike"><button>←</button><img src={primary.image} alt={primary.name}/><button>→</button></div><div className="colour-dots"><i/><i/><i/></div><div className="explorer-more"><p>More Cycles for you <Link href="/bikes">View All Models →</Link></p><div>{products.slice(0,3).map(p=><Link href={`/bikes/${p.slug}`} key={p.slug}><img src={p.image} alt={p.name}/><strong>{p.name}</strong><small>{formatPrice(p.price,market)}</small><span>View details →</span></Link>)}</div></div><Link className="pill dark" href="/bikes">View all models →</Link></section>

      <section className="dh-faq"><h2>FAQ’s</h2><p>Got questions? We’ve answered them here.</p><div>{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="dh-government"><div><h2>Partnership With The<br/>Government</h2><p>In partnership with Kuppam Development Authority, EMotorad deployed 10,000+ e-cycles to improve last-mile connectivity and empower students with sustainable mobility. A meaningful step towards building a cleaner, greener, and healthier future.</p><Link className="pill white" href="#impact">Explore Our Impact →</Link></div><img src="/government-ride.jpg" alt="EMotorad government partnership ride"/></section>

      <section className="dh-final-cta"><video src="/homepage-hero.mp4" autoPlay muted loop playsInline/><div><h2>Come, join the Electric Revolution</h2><p>Try an e-cycle for free. No strings attached. Just show up and ride.</p><Link className="pill white" href="/test-ride">Book free test drive</Link><a className="pill ghost" href="https://wa.me/">Talk on Whatsapp</a></div></section>
    </div>
  );
}
