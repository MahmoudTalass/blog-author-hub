import { useCallback } from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
   const { userDispatch } = useAuthContext();
   const logout = useCallback(() => {
      userDispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
   }, [userDispatch]);

   return logout;
}
