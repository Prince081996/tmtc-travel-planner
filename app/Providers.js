"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};
