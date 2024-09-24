import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("next-app");
  console.log(process.env.BACKEND_URI);
}
