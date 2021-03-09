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

  upload(data) {
    return this.client.post("/organizations/upload_organizations/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  editOrganization(id, data) {
    return this.client.put(`/organizations/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteOrganization(id) {
    return this.client.delete(`/organizations/${id}`);
  }
}
