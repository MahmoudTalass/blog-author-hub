import { useState } from "react";
import { useAuthContext } from "../auth/useAuthContext";
import { useLogout } from "../auth/useLogout";

export function usePostData(url, fetchMethod) {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [data, setData] = useState(null);
   const { user } = useAuthContext();
   const logout = useLogout();

   const postData = async (body) => {
      setIsLoading(true);
      try {
         const response = await fetch(url, {
            method: fetchMethod,
            headers: {
               Authorization: `Bearer ${user.token}`,
               "content-type": "application/json",
            },
            body: JSON.stringify(body),
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
         setData(json);
         setError(null);

         return json;
      } catch (err) {
         setError(err);
      } finally {
         setIsLoading(false);
      }
   };

   return { data, postData, error, isLoading };
}
