import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDeleteData } from "./useDeleteData";

export function PostCard({ post, deletePost, addPost }) {
   const { deleteData, error, isLoading } = useDeleteData(
      `http://localhost:3000/api/posts/${post._id}`
   );

   const handleDeletePost = async () => {
      const postId = post._id;
      deletePost(postId);
      await deleteData({ authorId: post.author._id });

      if (error) {
         addPost(post);
      }
   };

   return (
      <article className="flex flex-col gap-5 w-[500px] w-min-[300px] h-[300px] p-5 bg-color1 rounded-lg">
         {error && <p className="text-red-500">{error}</p>}
         <h3 className="text-3xl ">{post.title}</h3>

         <p className="">By: {post.author.name}</p>
         {post.isPublished && (
            <p className="">Publish date: {moment(post.publishDate).format("ll")}</p>
         )}
         <p className="">Creation date: {moment(post.createdAt).format("ll")}</p>
         <Link to={`/post/${post._id}`} className="underline w-fit">
            View post
         </Link>

         <div className="mt-auto flex justify-between ">
            <div
               className={`${post.isPublished ? "bg-green-700" : "bg-red-500"} rounded-md
                   flex justify-center items-center px-2 grow-0`}
            >
               {post.isPublished ? "Published" : "Unpublished"}
            </div>

            <div className="flex gap-4">
               <button
                  className="hover:scale-110 hover:transform"
                  onClick={handleDeletePost}
                  disabled={isLoading}
               >
                  <FontAwesomeIcon icon={faTrash} />
               </button>
               <button className="hover:scale-110 hover:transform">
                  <FontAwesomeIcon icon={faPenToSquare} />
               </button>
            </div>
         </div>
      </article>
   );
}

PostCard.propTypes = {
   post: PropTypes.object,
   addPost: PropTypes.func,
   deletePost: PropTypes.func,
};
