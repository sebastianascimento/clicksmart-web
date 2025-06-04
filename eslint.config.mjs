import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Change error to warn for unused variables
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Change error to warn for unescaped entities
      "react/no-unescaped-entities": "warn",
      
      // Change error to warn for any type
      "@typescript-eslint/no-explicit-any": "warn"
    }
  }
];

export default eslintConfig;