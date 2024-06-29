import { Navigate, useParams } from "react-router-dom";
import { CommentSection } from "../comments/CommentsSection";
import moment from "moment";
import { useFetch } from "../useFetch";
import { useAuthContext } from "../auth/useAuthContext";

export function Post() {
   const { user } = useAuthContext();
   const { postId } = useParams();
   const { data: post, error, isLoading } = useFetch(`http://localhost:3000/api/posts/${postId}`);

   if (!user) {
      return <Navigate to="/login" replace={true} />;
   }

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (error) {
      return (
         <div className="h-[500px] w-full flex justify-center items-center">
            <p className="text-2xl">{error.message}</p>
         </div>
      );
   }

   function decodeHtml(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
   }

   const unescapedText = decodeHtml(post.text);

   return (
      <div className="w-full flex justify-center mt-8">
         <section className="w-full sm:w-9/12 flex flex-col bg-[#1C2833] p-8 gap-12 rounded-xl ">
            <div className="flex flex-col gap-8">
               <h2 className="text-center sm:text-left text-3xl">{post.title}</h2>
               <div className="flex justify-between">
                  <p>{post.author.name}</p>
                  <p>{moment(post.publishDate).format("ll")}</p>
               </div>
               <div className="text-lg" dangerouslySetInnerHTML={{ __html: unescapedText }}></div>
            </div>
            <CommentSection />
         </section>
      </div>
   );
}
