import { useState, useMemo } from "react";
import { useAuthContext } from "./auth/useAuthContext";
import { Navigate, Link } from "react-router-dom";
import { PostCard } from "./posts/PostCard";
import { useFetch } from "./useFetch";
import { Spinner } from "./Spinner";

export function Home() {
   const { user } = useAuthContext();
   const [selectedFilter, setSelectedFilter] = useState("all");
   const { data, actions, error, isLoading } = useFetch(
      "https://blog-api-service.fly.dev/api/users/me/posts"
   );

   const handleFilterChange = (e) => setSelectedFilter(e.target.value);

   const filteredPosts = useMemo(() => {
      if (selectedFilter === "all") {
         return data;
      } else if (selectedFilter === "published") {
         return data.filter((post) => post.isPublished === true);
      } else {
         return data.filter((post) => post.isPublished === false);
      }
   }, [data, selectedFilter]);

   if (!user) return <Navigate to="/login" />;

   if (isLoading || !data) return <Spinner />;

   if (error) {
      return <p>{error.message}</p>;
   }

   return (
      <div className="m-4 flex justify-center">
         <div className="flex flex-col max-w-[1200px] w-full">
            <div className="flex justify-between">
               <Link to="/create-post">
                  <button className="px-4 py-2 bg-color1 rounded-md">Create new post</button>
               </Link>
               <select
                  name="publicationStatus"
                  id="publicationStatus"
                  className="bg-color1 ml-auto p-2 rounded-md"
                  value={selectedFilter}
                  onChange={handleFilterChange}
               >
                  <option value="all">All</option>
                  <option value="published">published</option>
                  <option value="unpublished">unpublished</option>
               </select>
            </div>
            <section className="max-w-[1200px] flex flex-wrap w-full gap-5 p-6 justify-center">
               {filteredPosts.map((post) => {
                  return (
                     <PostCard
                        key={post._id}
                        post={post}
                        deletePost={actions.deleteData}
                        addPost={actions.addData}
                     />
                  );
               })}
               {data.length === 0 && <p>No posts</p>}
            </section>
         </div>
      </div>
   );
}
