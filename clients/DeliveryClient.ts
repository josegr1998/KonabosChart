import { DeliveryClient, TypeResolver } from "@kentico/kontent-delivery";

export const deliverySdk = new DeliveryClient({
  projectId: process.env.PROJECT_ID as string,
  globalQueryConfig: {
    useSecuredMode: true,
  },
  secureApiKey: process.env.DELIVERY_API_KEY,
});
