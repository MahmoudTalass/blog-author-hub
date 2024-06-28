import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "./useAuthContext";

export function useAuthenticate() {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const { userDispatch } = useAuthContext();

   async function authenticate(body, authType) {
      setIsLoading(true);

      try {
         const response = await fetch(`http://localhost:3000/api/auth/${authType}`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(body),
         });

         const json = await response.json();

         if (!response.ok) {
            throw new Error(json.error.message);
         }

         const { id, author } = jwtDecode(json.token);

         const payload = {
            token: json.token,
            id,
            name: json.name,
            author,
         };

         const localStorageUserObj = { name: payload.name, token: payload.token };
         localStorage.setItem("user", JSON.stringify(localStorageUserObj));

         userDispatch({ type: "LOGIN", payload });
         setError(null);
      } catch (err) {
         setError(err);
      } finally {
         setIsLoading(false);
      }
   }

   return { authenticate, error, isLoading };
}
