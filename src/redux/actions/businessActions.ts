import api from "../../config/api";
import {
  GET_ALL_ECOSYSTEM,
  GET_ALL_SUB_ECOSYSTEM,
  GET_ALL_ORGANIZATION,
} from "../constants";

export const getEcosystem = () => async dispatch => {
  const res = await api.business.getEcosystem();

  if (res && res.status === 200) {
    const ecosystem = res.data && res.data.data;
    dispatch({
      type: GET_ALL_ECOSYSTEM,
      payload: ecosystem || [],
    });
  }

  return Promise.resolve(res);
};

export const getSubEcosystem = () => async dispatch => {
  const res = await api.business.getSubEcosystem();

  if (res && res.status === 200) {
    const subEcosystem = res.data && res.data.data;
    dispatch({
      type: GET_ALL_SUB_ECOSYSTEM,
      payload: subEcosystem || [],
    });
  }

  return Promise.resolve(res);
};

export const getOrganization = () => async dispatch => {
  const res = await api.business.getOrganization();

  if (res && res.status === 200) {
    const organization = res.data && res.data.data;

    // let filteredPayload = organization.find(org => org.id === 2);
    // filteredPayload.description =
    //   "Our goal is to enable aspiring and emerging Nigerian entrepreneurs start, grow and scale their businesses while also facilitating the development of an enabling business environment and thriving ecosystem. In 2000, we were founded by Mr. Fola Adeola to harness the strong entrepreneurial culture of Nigerians by providing the business incubation, growth and accelerator support required to fully explore their innovative potential.";

    // filteredPayload.url_1 =
    //   "https://guardian.ng/appointments/equipping-entrepreneurs-with-financial-literacy-skills/";
    // filteredPayload.ceo_name = "Fola Adeola";

    // filteredPayload.address =
    //   "1st Floor, Lagos State Water Corporation, Water House, Ijora Olopa, Ijora, Lagos";

    // filteredPayload.sector = "Private Sector Groups & Associations";

    // filteredPayload.num_of_employees = "50-100";
    // filteredPayload.company_logo_url = "../../static/img/fate.jpeg";

    dispatch({
      type: GET_ALL_ORGANIZATION,
      payload: organization || [],
    });
  }

  return Promise.resolve(res);
};

export const addOrganization = data => async dispatch => {
  const res = await api.business.addBusiness(data);

  return Promise.resolve(res);
};
