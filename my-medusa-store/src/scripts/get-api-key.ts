import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function getApiKey({ container }: ExecArgs) {
  const apiKeyModuleService = container.resolve(Modules.API_KEY);
  
  const apiKeys = await apiKeyModuleService.listApiKeys({
    type: "publishable",
  });
  
  if (apiKeys.length > 0) {
    console.log("Publishable API Key:", apiKeys[0].token);
    console.log("Copy this key to your E2E test file!");
  } else {
    console.log("No publishable API keys found. Run 'npm run seed' first.");
  }
}
