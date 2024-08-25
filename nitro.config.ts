//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  runtimeConfig: {
    adminKey: JSON.parse(process.env.FIREBASE_ADMIN_KEY || "{}"),
    apiKey: process.env.FIREBASE_API_KEY,
  },
});
