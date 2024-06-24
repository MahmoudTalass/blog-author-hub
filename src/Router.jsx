import { createBrowserRouter } from "react-router-dom";
import PageLayout from "./PageLayout";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";

const router = createBrowserRouter([
   {
      path: "/",
      element: <PageLayout />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "/signup",
            element: <Signup />,
         },
         {
            path: "/login",
            element: <Login />,
         },
      ],
   },
]);

export default router;
