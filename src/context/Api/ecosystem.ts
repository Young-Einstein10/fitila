import { AxiosInstance, AxiosRequestConfig } from "axios";

export default class Ecosystem {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  getEcosystem(config?: AxiosRequestConfig) {
    return this.client.get("/ecosystem/", config);
  }

  getSubEcosystem(config?: AxiosRequestConfig) {
    return this.client.get("/sub_ecosystem", config);
  }

  getSubClass(config?: AxiosRequestConfig) {
    return this.client.get("/subclass/", config);
  }

  addEcosystem(data?: any) {
    return this.client.post("/ecosystem/", data);
  }
}
