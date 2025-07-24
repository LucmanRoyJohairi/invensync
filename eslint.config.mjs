import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// ESLint Config
const eslintConfig = [
  // Load Next.js recommended rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add Prettier & TypeScript-ESLint rules
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ),

  // You can define custom rules here
  {
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
    },
  },
];

export default eslintConfig;
