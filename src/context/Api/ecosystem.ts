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

  addSubEcosystem(data?: any) {
    return this.client.post("/sub_ecosystem/", data);
  }

  editSubEcosystem(id: number, data?: any) {
    return this.client.put(`/sub_ecosystem/${id}`, data);
  }

  deleteSubEcosystem(id: number) {
    return this.client.delete(`/sub_ecosystem/${id}`);
  }

  getSubClass(config?: AxiosRequestConfig) {
    return this.client.get("/subclass/", config);
  }

  addSubClass(data?: any) {
    return this.client.post("/subclass/", data);
  }

  editSubClass(id: number, data?: any) {
    return this.client.put(`/subclass/${id}`, data);
  }

  deleteSubClass(id: number) {
    return this.client.delete(`/subclass/${id}`);
  }

  addEcosystem(data?: any) {
    return this.client.post("/ecosystem/", data);
  }

  editEcosystem(id: number, data?: any) {
    return this.client.put(`/ecosystem/${id}`, data);
  }

  deleteEcosystem(id: number) {
    return this.client.delete(`/ecosystem/${id}`);
  }
}
