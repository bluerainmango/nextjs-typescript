import { ApiConfig } from "@common/types/api";
import { fetchApi } from "../utils";

class Config {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  getConfig(): ApiConfig {
    return this.config;
  }
}

const configWrapper = new Config({
  apiUrl: "http://localhost:4000/graphql", // Shopify-local server API url
  fetch: fetchApi,
});

export function getConfig() {
  return configWrapper.getConfig();
}
