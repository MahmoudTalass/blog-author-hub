import { usePostData } from "./usePostData";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "./PostForm";
import { useFetch } from "../useFetch";
import { Spinner } from "../Spinner";

export function EditPost() {
   const { postId } = useParams();
   const {
      data: post,
      error: fetchError,
      isLoading: isFetching,
   } = useFetch(`https://blog-api-service.fly.dev/api/posts/${postId}`);
   const {
      postData,
      error: mutationError,
      isLoading: isMutating,
   } = usePostData(`https://blog-api-service.fly.dev/api/posts/${postId}`, "PUT");
   const navigate = useNavigate();

   const submitForm = async (body) => {
      body = { ...post, text: body.text, title: body.title, isPublished: body.isPublished };

      if (body.isPublished && !post.isPublished) {
         body["publishDate"] = Date.now();
      }

      await postData(body);

      navigate(`/posts/${post._id}`);
   };

   if (isFetching) {
      return <Spinner />;
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
            post={post}
            formType=""
         />
      </section>
   );
}
