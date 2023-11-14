import { createContext, useReducer } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
  error: "",
});

type State = {
  user: User | null;
  loading: boolean;
  error: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: State, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: "",
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: "",
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
    error: "",
  });

  const { user, loading, error } = state;
  const data = {
    user,
    loading,
    error,
  };
  const testUser: User = {
    id: 1,
    email: "tranminhtoan1280@gmail.com",
    name: "Toan Tran",
    birthday: new Date("1999-12-12"),
    gender: "male",
  };
  dispatch({ type: "LOGIN", payload: testUser });
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
