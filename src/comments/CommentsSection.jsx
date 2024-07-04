import { useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useFetch } from "../useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../auth/useAuthContext";
import { usePostData } from "../posts/usePostData";

export function CommentSection() {
   const { postId } = useParams();
   const {
      data: comments,
      error: fetchError,
      actions,
      isLoading: isFetching,
   } = useFetch(`https://blog-api-service.fly.dev/api/posts/${postId}/comments`);
   const [commentInput, setCommentInput] = useState("");
   const { user } = useAuthContext();
   const {
      error: mutationError,
      postData,
      isLoading: isMutating,
   } = usePostData("https://blog-api-service.fly.dev/api/comments", "POST");

   const handlePostComment = async () => {
      const body = { text: commentInput, postId };
      const newComment = await postData(body);
      setCommentInput("");
      actions.addData(newComment);
   };

   return (
      <section>
         <hr />
         <p className="text-2xl py-4 font-bold">comments:</p>
         <hr />
         <br />
         <div>
            <div className="flex gap-2 items-center mb-4">
               <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow bg-[#2C3E50] p-2 rounded"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
               />
               <button
                  disabled={commentInput.length === 0 || isMutating}
                  className={`bg-[#3498DB] py-2 px-5 rounded text-[#ECF0F1]`}
                  title="post"
                  onClick={() => handlePostComment()}
               >
                  Add comment
               </button>
            </div>
            {mutationError &&
               (mutationError.errors.length > 0 ? (
                  mutationError.errors.map((err) => {
                     return (
                        <p key={err.message} className="text-red-500">
                           {err.message}
                        </p>
                     );
                  })
               ) : (
                  <p className="text-red-500">{mutationError?.message}</p>
               ))}
         </div>
         {fetchError && <p>Could not get comments. Please try again later.</p>}
         {isFetching || !comments ? (
            <div className="w-full flex justify-center items-center">
               <FontAwesomeIcon icon={faEllipsis} fade size="2x" />
            </div>
         ) : (
            <div className="flex flex-col gap-4">
               {comments.map((comment) => {
                  return (
                     <Comment
                        key={comment._id}
                        comment={comment}
                        commentActions={actions}
                        isCurrentUserComment={user.id === comment.author._id}
                     />
                  );
               })}
               {comments.length === 0 && <p>No comments yet</p>}
            </div>
         )}
      </section>
   );
}
