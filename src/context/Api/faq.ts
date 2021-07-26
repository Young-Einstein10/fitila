import { AxiosInstance } from "axios";

export default class FAQ {
  client: AxiosInstance;

  constructor(client) {
    this.client = client;
  }

  getAllFaq() {
    return this.client.get("/cms/faqs/");
  }

  addFaq(data) {
    return this.client.post("/cms/faqs/", data);
  }

  getFaq(faq_id) {
    return this.client.get(`/cms/faqs/${faq_id}/`);
  }

  editFaq(faq_id, data) {
    return this.client.put(`/cms/faqs/${faq_id}/`, data);
  }

  deleteFaq(faq_id) {
    return this.client.delete(`/cms/faqs/${faq_id}/`);
  }
}
