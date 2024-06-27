import { usePostData } from "./usePostData";
import { useNavigate } from "react-router-dom";
import { PostForm } from "./PostForm";

export function CreatePost() {
   const { postData, data, error, isLoading } = usePostData(
      "http://localhost:3000/api/posts",
      "POST"
   );
   const navigate = useNavigate();

   const submitForm = async (body) => {
      if (body.isPublished) {
         body["publishDate"] = Date.now();
      }
      await postData(body);
      navigate(`/posts/${data._id}`);
   };

   return (
      <PostForm
         error={error}
         submitForm={submitForm}
         isLoading={isLoading}
         post={null}
         formType="create"
      />
   );
}
