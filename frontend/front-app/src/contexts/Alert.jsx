import React, { useReducer, createContext, useContext } from "react"; // Importation sans "Dispatch"

export const AlertContext = createContext(); // Pas besoin de spécifier le type ici

const initialState = {
  type: "close",
  open: false,
  alertType: "info",
};

function reducer(state, action) { // Pas besoin de spécifier le type pour "state" et "action"
  console.error(action)
  switch (action.type) {
    case "close":
      return {
        ...initialState,
      };
    case "open":
      return {
        ...state,
        open: true,
        alertType: action.alertType,
        message: action.message,
      };
    default:
      throw new Error(`unknown action from state: ${JSON.stringify(action)}`);
  }
}

export function AlertProvider({ children }) { // Pas besoin de spécifier le type pour "children"
  const [alert, dispatch] = useReducer(reducer, initialState);

  console.error(alert);

  return (
    <AlertContext.Provider value={{ alert, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
