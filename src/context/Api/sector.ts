import { AxiosInstance, AxiosRequestConfig } from "axios";

export default class Sector {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  getSector(config?: AxiosRequestConfig) {
    return this.client.get("/sector/", config);
  }

  addSector(data) {
    return this.client.post("/sector/", data);
  }

  editSector(id, data) {
    return this.client.put(`/sector/${id}`, data);
  }

  deleteSector(id) {
    return this.client.delete(`/sector/${id}`);
  }
}
