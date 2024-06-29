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
   } = useFetch(`http://localhost:3000/api/posts/${postId}/comments`);
   const [commentInput, setCommentInput] = useState("");
   const { user } = useAuthContext();
   const {
      data,
      error,
      postData,
      isLoading: isMutating,
   } = usePostData("http://localhost:3000/api/comments", "POST");

   function handlePostComment() {
      postData(postId, commentInput, setCommentInput);
   }

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
            {error && (
               <div className="mb-5">
                  <p className="text-red-600">{error.message}</p>
               </div>
            )}
         </div>
         {fetchError && <p>Could not get comments. Please try again later.</p>}
         {isFetching ? (
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
