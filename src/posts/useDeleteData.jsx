import { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";
import { useLogout } from "../auth/useLogout";

export function useDeleteData(url) {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const { user } = useAuthContext();
   const logout = useLogout();

   const deleteData = async () => {
      setIsLoading(true);
      try {
         const response = await fetch(url, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${user.token}`,
               "content-type": "application/json",
            },
         });

         if (response.status === 401) {
            logout();
            throw new Error("Authorization required");
         }

         const json = await response.json();

         if (response.status === 400) {
            return setError(json.error);
         }

         if (!response.ok) {
            throw new Error(json.error.message);
         }

         setError(null);
      } catch (err) {
         setError(err);
      } finally {
         setIsLoading(false);
      }
   };

   return { deleteData, error, isLoading };
}
