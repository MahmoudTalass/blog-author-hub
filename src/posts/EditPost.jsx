import { usePostData } from "./usePostData";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "./PostForm";
import { useFetch } from "../useFetch";

export function EditPost() {
   const { postId } = useParams();
   const {
      data: post,
      error: fetchError,
      isLoading: isFetching,
   } = useFetch(`http://localhost:3000/api/posts/${postId}`);
   const {
      postData,
      data: mutatedData,
      error: mutationError,
      isLoading: isMutating,
   } = usePostData("http://localhost:3000/api/posts", "POST");
   const navigate = useNavigate();

   const submitForm = async (body) => {
      if (body.isPublished && !post.post.isPublished) {
         body["publishDate"] = Date.now();
      }
      body["_id"] = post.post._id;

      await postData(body);
      navigate(`/posts/${mutatedData._id}`);
   };

   if (isFetching) {
      return <p>Loading...</p>;
   }

   if (fetchError) {
      return <p>Something went wrong. Please try again later.</p>;
   }

   return (
      <section className="flex flex-col items-center mt-6">
         <PostForm
            error={mutationError}
            submitForm={submitForm}
            isLoading={isMutating}
            post={post.post}
            formType=""
         />
      </section>
   );
}
