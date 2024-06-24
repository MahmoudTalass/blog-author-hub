import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

export function useAuthContext() {
   const context = useContext(AuthContext);

   if (!context) {
      console.log("Component must be wrapped by the auth provider to access auth context.");
   }

   return context;
}
