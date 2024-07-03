import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useOutsideClick } from "../useOutsideClick";
import PropTypes from "prop-types";
import moment from "moment";
import { usePostData } from "../posts/usePostData";
import { useDeleteData } from "../posts/useDeleteData";
import { useAuthContext } from "../auth/useAuthContext";

function Comment({ comment, commentActions, isCurrentUserComment }) {
   // toggle display state
   const [displayOptions, setDisplayOptions] = useState(false); // handles displaying the options tools for a comment (delete/edit)
   const [isEditing, setIsEditing] = useState(false); // handles displaying the input field for editing a comment

   // DOM ref
   const commentOptionsRef = useRef(null);

   // Hook to handle hiding an element when clicking outside the element
   useOutsideClick(commentOptionsRef, setDisplayOptions);

   // state for text that the user will type to update/edit their comment
   const [commentInput, setCommentInput] = useState(comment.text);
   const { error: updateError, postData } = usePostData(
      `http://localhost:3000/api/comments/${comment._id}`,
      "PUT"
   );
   const { deleteData, error: deleteError } = useDeleteData(
      `http://localhost:3000/api/comments/${comment._id}`
   );

   const { user } = useAuthContext();

   function handleDisplayEditing() {
      setCommentInput(comment.text);
      setIsEditing(true);
      setDisplayOptions(false);
   }

   const handleUpdateComment = async () => {
      const body = {
         text: commentInput,
      };

      const updatedComment = await postData(body);

      commentActions.updateData(updatedComment, updatedComment._id);

      if (!updateError) {
         setIsEditing(false);
      }
   };

   const handleDeleteComment = async () => {
      const commentId = comment._id;
      commentActions.deleteData(commentId);
      await deleteData();

      if (deleteError) {
         commentActions.addData(comment);
      }
   };

   return (
      <>
         <div className="flex gap-4 items-center bg-color3 p-2 rounded-lg ">
            {isEditing && (
               <div className="flex flex-col gap-2 flex-grow">
                  <input
                     type="text"
                     placeholder="comment..."
                     className="w-full bg-inherit border-b-4 border-solid"
                     value={commentInput}
                     onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                     <button
                        className={"border rounded-full px-4 py-2 w-min text-sm bg-color1"}
                        title="cancel"
                        onClick={() => setIsEditing(false)}
                     >
                        cancel
                     </button>
                     <button
                        disabled={commentInput.length === 0}
                        className={`opacity-${
                           commentInput.length === 0 ? "10" : "100"
                        } border rounded-full px-4 py-2 w-min text-sm bg-color1`}
                        title="save"
                        onClick={handleUpdateComment}
                     >
                        save
                     </button>
                  </div>
                  <div>
                     {updateError &&
                        (updateError.errors?.length > 0 ? (
                           updateError?.errors?.map((err) => {
                              return (
                                 <p key={err.message} className="text-red-500">
                                    {err.message}
                                 </p>
                              );
                           })
                        ) : (
                           <p className="text-red-500">{updateError.message}</p>
                        ))}
                  </div>
               </div>
            )}
            {!isEditing && (
               <>
                  <div className="flex-grow flex flex-col gap-1">
                     <div className="flex flex-col">
                        <p className="font-bold">
                           {comment.author.name}
                           {comment.author._id === user.id && (
                              <span className="italic"> (You)</span>
                           )}{" "}
                        </p>
                        <p className="text-sm text-gray-400">
                           {moment(comment.createdAt).fromNow()}
                        </p>
                     </div>
                     <p>{comment.text}</p>
                  </div>
                  <div className="relative">
                     <button
                        onClick={() => setDisplayOptions(!displayOptions)}
                        aria-haspopup="true"
                        aria-expanded={displayOptions}
                     >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                     </button>
                     {displayOptions && (
                        <div
                           className="flex flex-col bg-color2 rounded absolute right-0 z-10 p-1 px-3 gap-1"
                           role="menu"
                           ref={commentOptionsRef}
                        >
                           {isCurrentUserComment && (
                              <button role="menuitem" onClick={handleDisplayEditing}>
                                 Edit
                              </button>
                           )}
                           <hr />
                           <button role="menuitem" onClick={handleDeleteComment}>
                              Delete
                           </button>
                        </div>
                     )}
                  </div>
               </>
            )}
         </div>

         {deleteError && <p>{deleteError.message}</p>}
      </>
   );
}

Comment.propTypes = {
   comment: PropTypes.object,
   commentActions: PropTypes.object,
   isCurrentUserComment: PropTypes.bool,
};

export default Comment;
