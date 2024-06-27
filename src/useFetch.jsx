import { useEffect, useReducer, useState } from "react";
import { useLogout } from "./auth/useLogout";
import { useAuthContext } from "./auth/useAuthContext";

function reducer(data, action) {
   switch (action.type) {
      case "ADD":
         return [action.payload, ...data];
      case "DELETE":
         return data.filter((item) => item._id !== action.id);
      case "SET":
         return action.payload;
      default:
         throw new Error("Invalid reducer action type");
   }
}

export function useFetch(url) {
   const [data, dispatch] = useReducer(reducer, []);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const { user } = useAuthContext();
   const logout = useLogout();

   const setData = (data) => dispatch({ type: "SET", payload: data });
   const deleteData = (id) => dispatch({ type: "DELETE", id });
   const addData = (data) => dispatch({ type: "ADD", payload: data });

   useEffect(() => {
      let active = true;

      async function fetchData() {
         try {
            const response = await fetch(url, {
               headers: {
                  Authorization: `Bearer ${user.token}`,
               },
            });

            if (response.status === 401) {
               setData([]);
               return logout();
            }

            const json = await response.json();

            if (!response.ok) {
               setData([]);
               throw new Error(json.error.message);
            }

            if (active) {
               setData(json);
            }
         } catch (err) {
            setError(err);
         } finally {
            setIsLoading(false);
         }
      }

      fetchData();

      return () => {
         active = false;
      };
   }, [url, user, logout]);

   const actions = {
      setData,
      deleteData,
      addData,
   };

   return { data, isLoading, error, actions };
}
