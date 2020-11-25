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
