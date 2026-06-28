import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    // Prototype media can be local uploads or an unfinalised CDN. The handoff
    // explicitly replaces raw images once the production image pipeline exists.
    rules: { "@next/next/no-img-element": "off" },
  },
  globalIgnores([".next/**", "next-env.d.ts"]),
]);
