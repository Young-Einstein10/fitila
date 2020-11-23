import api from "../../config/api";
import { SET_CURRENT_USER } from "../constants";

// Signin user
export const signinUser = (userData: {
  email: string;
  password: string;
}) => async (dispatch: any) => {
  const res = await api.auth.login(userData);

  if (res.status && res.status === 200) {
    const {
      data: { data },
    } = res;

    localStorage.setItem("userData", JSON.stringify(data));

    dispatch(setCurrentUser({ ...data }));
  }
};

// Signup
export const signupUser = (userData: {
  email: string;
  password: string;
}) => async (dispatch: any) => {
  const res = await api.auth.signup(userData);

  if (res.status && res.status === 200) {
    const {
      data: { data },
    } = res;

    localStorage.setItem("userDetails", JSON.stringify(data));

    dispatch(setCurrentUser({ ...data }));
  }
};

// Logout
export const signoutUser = () => (dispatch: any) => {
  // Remove token from localStorage
  localStorage.removeItem("userDetails");

  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set Current User
export const setCurrentUser = (user: any) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
