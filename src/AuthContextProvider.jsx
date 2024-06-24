import { jwtDecode } from "jwt-decode";
import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
   user: null,
});

const userReducer = (user, action) => {
   switch (action.type) {
      case "LOGIN":
         return {
            name: action.name,
            id: action.id,
            token: action.token,
            author: action.author,
         };
      case "LOGOUT":
         return null;
      default:
         return user;
   }
};

export const AuthContextProvider = ({ children }) => {
   // initialize user state if user exists in local storage
   const initializeUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      let user = null;
      if (storedUser) {
         const { id, author } = jwtDecode(storedUser.token);
         const name = storedUser.name;
         user = {
            token: storedUser.token,
            id,
            name,
            author,
         };
      }

      return user;
   };

   const [user, userDispatch] = useReducer(userReducer, null, initializeUser);

   return <AuthContext.Provider value={{ user, userDispatch }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
   children: PropTypes.element,
};
