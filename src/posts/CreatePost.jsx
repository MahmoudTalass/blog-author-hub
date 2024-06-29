import { usePostData } from "./usePostData";
import { useNavigate } from "react-router-dom";
import { PostForm } from "./PostForm";

export function CreatePost() {
   const { postData, error, isLoading } = usePostData("http://localhost:3000/api/posts", "POST");
   const navigate = useNavigate();

   const submitForm = async (body) => {
      if (body.isPublished) {
         body["publishDate"] = Date.now();
      }
      const newPost = await postData(body);
      navigate(`/posts/${newPost._id}`);
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
