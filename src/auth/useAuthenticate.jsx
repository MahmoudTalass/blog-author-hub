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

         if (response.status === 400) {
            return setError(json.error);
         }

         if (!response.ok) {
            throw new Error(json.error.message);
         }

         const { id, author } = jwtDecode(json.token);
         if (!author) {
            throw new Error(
               "Unauthorized access. To access this site you must be a registered author. Please sign up for a new author account to gain access."
            );
         }
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
