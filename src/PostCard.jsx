import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function PostCard({ post }) {
   return (
      <Link to={`/post/${post._id}`}>
         <article className="flex flex-col gap-5 w-[500px] w-min-[300px] p-5 bg-color1 rounded-lg">
            <div className="flex justify-between">
               <h3 className="text-3xl ">{post.title}</h3>
               <div
                  className={`bg-${post.isPublished ? "green-700" : "red-500"} rounded-md
                   flex justify-center items-center px-2`}
               >
                  {post.isPublished ? "Published" : "Unpublished"}
               </div>
            </div>
            <p className="">By: {post.author.name}</p>
            {post.isPublished && (
               <p className="">Publish date: {moment(post.publishDate).format("ll")}</p>
            )}
            <p className="">Creation date: {moment(post.createdAt).format("ll")}</p>
         </article>
      </Link>
   );
}

PostCard.propTypes = {
   post: PropTypes.object,
};
