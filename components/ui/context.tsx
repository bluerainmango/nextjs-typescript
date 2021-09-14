import { createContext, FC, useContext, useReducer } from "react";

export interface StateModifiers {
  openSidebar: () => void;
  closeSidebar: () => void;
}

export interface StateValues {
  isSidebarOpen: boolean;
}

const stateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {},
};

const initialState = {
  isSidebarOpen: false,
};

type State = StateModifiers & StateValues;

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState,
});

// createContext<any> 등 가능. 아래는 obj형태의 state
// const UIContext = createContext<{ [key: string]: any }>({
//   uiState: "defaultState",
// });

type Action = { type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR" };

function uiReducer(state: StateValues, action: Action) {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
  }
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
  const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

  const value = {
    ...state,
    closeSidebar,
    openSidebar,
  };

  //   const [isSidebarOpen, setSidebarOpen] = useState(false);

  //   const uiState = {
  //     isSidebarOpen,
  //     setSidebarOpen,
  //   };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};
