import { createBrowserRouter } from "react-router-dom";
import { PageLayout } from "./PageLayout";
import { Home } from "./Home";
import { Signup } from "./auth/Signup";
import { Login } from "./auth/Login";
import { CreatePost } from "./posts/CreatePost";
import { EditPost } from "./posts/EditPost";
import { Post } from "./posts/Post";

export const router = createBrowserRouter([
   {
      element: <PageLayout />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/create-post",
            element: <CreatePost />,
         },
         {
            path: "/:postId/edit",
            element: <EditPost />,
         },
         {
            path: "/post/:postId",
            element: <Post />,
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
