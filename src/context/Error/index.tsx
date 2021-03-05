import React, { createContext, FC, useReducer } from "react";
import { message } from "antd";

type ActionProps =
  | {
      type: "GET_ERRORS";
      payload?: {
        message?: any;
        error?: any;
        detail?: any;
        statusText?: any;
      };
    }
  | {
      type: "RESET_ERROR";
      payload?: {
        message?: any;
        error?: any;
        detail?: any;
        statusText?: any;
      };
    };

type Dispatch = (action: ActionProps) => void;
type ErrorProps = null;

const ErrorStateContext = createContext<ErrorProps | undefined>(undefined);
const ErrorDispatchContext = createContext<Dispatch | undefined>(undefined);

const toastMessageDuration: number = 5; //sec
const initialState: any = null;

const errorReducer = (state = initialState, action: ActionProps) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_ERRORS":
      if (payload && payload.message) {
        message.error(payload.message, toastMessageDuration);
        return payload.message;
      } else if (payload && payload.detail) {
        message.error(payload.detail, toastMessageDuration);
        return payload.detail;
      } else if (payload && payload.statusText) {
        message.error(payload.statusText, toastMessageDuration);
        return payload.statusText;
      }
      break;
    case "RESET_ERROR":
      return null;
    default:
      return state;
  }
};

const ErrorProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  return (
    <ErrorStateContext.Provider value={state}>
      <ErrorDispatchContext.Provider value={dispatch}>
        {children}
      </ErrorDispatchContext.Provider>
    </ErrorStateContext.Provider>
  );
};

function useErrorContext() {
  const context = React.useContext(ErrorStateContext);
  if (context === undefined) {
    throw new Error("useErrorContex must be used within a ErrorProvider");
  }
  return context;
}

function useErrorDispatch() {
  const context = React.useContext(ErrorDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useErrorDispatch must be used within a ErrorDispatchProvider"
    );
  }
  return context;
}

export { ErrorProvider, useErrorContext, useErrorDispatch };
