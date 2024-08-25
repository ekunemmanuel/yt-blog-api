import { initializeApp, getApps, cert } from "firebase-admin/app";

export default defineNitroPlugin((nitroApp) => {
  const app = getApps();
  const { adminKey } = useRuntimeConfig();

  if (!app.length) {
    initializeApp({
      credential: cert({
        projectId: adminKey.project_id,
        clientEmail: adminKey.client_email,
        privateKey: adminKey.private_key,
      }),
    });
  }
});
