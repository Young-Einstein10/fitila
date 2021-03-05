import { AxiosInstance } from "axios";

export default class Organization {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  getOrganization() {
    return this.client.get("/organizations");
  }

  addBusiness(data) {
    return this.client.post("/add_organization/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
