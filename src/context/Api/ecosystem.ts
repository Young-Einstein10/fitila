import { AxiosInstance } from "axios";

export default class Ecosystem {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  getEcosystem() {
    return this.client.get("/ecosystem/");
  }

  getSubEcosystem() {
    return this.client.get("/sub_ecosystem");
  }
}
