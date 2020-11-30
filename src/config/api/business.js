export default class Business {
  constructor(client) {
    this.client = client;
  }

  addBusiness(data) {
    return this.client.post("/add_organization/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getEcosystem() {
    return this.client.get("/ecosystem");
  }

  getOrganization() {
    return this.client.get("/organizations");
  }

  getSubEcosystem() {
    return this.client.get("/sub_ecosystem");
  }
}
