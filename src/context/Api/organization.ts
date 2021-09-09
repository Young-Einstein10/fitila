import { AxiosInstance, AxiosRequestConfig } from "axios";

export default class Organization {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  getOrganization() {
    return this.client.get("/organizations");
  }

  getPendingOrganization(config?: AxiosRequestConfig) {
    return this.client.get("/organizations/pending");
  }

  addBusiness(data) {
    return this.client.post("/organizations/", data, {
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

  approveOrganization(id) {
    return this.client.get(`/organizations/approve/${id}`);
  }

  declineOrganization(id, reason) {
    return this.client.post(`/organizations/decline/${id}`, { reason });
  }

  deleteOrganization(id) {
    return this.client.delete(`/organizations/${id}`);
  }
}
