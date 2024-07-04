import { Navigate, useParams } from "react-router-dom";
import { CommentSection } from "../comments/CommentsSection";
import moment from "moment";
import { useFetch } from "../useFetch";
import { useAuthContext } from "../auth/useAuthContext";
import DOMPurify from "dompurify";
import { decode } from "he";
import { Spinner } from "../Spinner";

export function Post() {
   const { user } = useAuthContext();
   const { postId } = useParams();
   const { data: post, error, isLoading } = useFetch(`http://localhost:3000/api/posts/${postId}`);

   if (!user) {
      return <Navigate to="/login" replace={true} />;
   }

   if (isLoading || !post) {
      return <Spinner />;
   }

   if (error) {
      return (
         <div className="h-[500px] w-full flex justify-center items-center">
            <p className="text-2xl">{error.message}</p>
         </div>
      );
   }

   const decodedHtml = decode(post.text);
   const sanitizedHtml = DOMPurify.sanitize(decodedHtml);

   return (
      <div className="w-full flex justify-center mt-8 ">
         <section className="w-full sm:w-11/12 flex flex-col bg-[#1C2833] p-8 gap-12 rounded-xl ">
            <div className="flex flex-col gap-8">
               <h2 className="text-center sm:text-left text-3xl">{post.title}</h2>
               <div className="flex justify-between">
                  <p>By: {post.author.name}</p>
                  <p>{moment(post.publishDate).format("ll")}</p>
               </div>
               <hr />
               <div
                  className="p-4 prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
               ></div>
            </div>
            <CommentSection />
         </section>
      </div>
   );
}
