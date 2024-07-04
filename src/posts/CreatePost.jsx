import { usePostData } from "./usePostData";
import { useNavigate } from "react-router-dom";
import { PostForm } from "./PostForm";

export function CreatePost() {
   const { postData, error, isLoading } = usePostData(
      "https://blog-api-service.fly.dev/api/posts",
      "POST"
   );
   const navigate = useNavigate();

   const submitForm = async (body) => {
      if (body.isPublished) {
         body["publishDate"] = Date.now();
      }
      try {
         const newPost = await postData(body);
         navigate(`/posts/${newPost._id}`);
      } catch (err) {
         console.log();
      }
   };

   return (
      <section className="flex flex-col items-center mt-6">
         <PostForm
            error={error}
            submitForm={submitForm}
            isLoading={isLoading}
            post={null}
            formType="create"
         />
      </section>
   );
}
