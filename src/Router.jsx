import { createBrowserRouter } from "react-router-dom";
import { PageLayout } from "./PageLayout";
import { Home } from "./Home";
import { Signup } from "./auth/Signup";
import { Login } from "./auth/Login";

export const router = createBrowserRouter([
   {
      element: <PageLayout />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "signup",
            element: <Signup />,
         },
         {
            path: "login",
            element: <Login />,
         },
      ],
   },
]);
