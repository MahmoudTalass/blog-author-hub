import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

export function PostForm({ error, post, isLoading, formType, submitForm }) {
   const [text, setText] = useState(post ? post.text : "");
   const [title, setTitle] = useState(post ? post.title : "");
   const [isPublished, setIsPublished] = useState(post ? post.isPublished : false);

   const handleTextInput = (newValue) => setText(newValue);
   const handleTitleInput = (e) => setTitle(e.target.value);
   const handlePublishedCheckbox = () => setIsPublished(!isPublished);

   const handleSubmitForm = async () => {
      const body = { text, title, isPublished };
      submitForm(body);
   };

   console.log("post", post);

   return (
      <div className="max-w-[900px] flex flex-col gap-4">
         <h2 className="font-bold text-3xl">
            {formType === "create" ? "Create new post" : "Edit post"}
         </h2>
         <input
            type="text"
            required
            placeholder="Title..."
            className="w-full rounded-lg p-2 bg-color1"
            onChange={handleTitleInput}
            value={title}
         />
         <div>
            <Editor
               apiKey={import.meta.env.VITE_TINYMCE_KEY}
               init={{
                  height: 500,
                  menubar: true,
                  placeholder: "Type here...",
                  plugins: [
                     "advlist",
                     "autolink",
                     "lists",
                     "link",
                     "charmap",
                     "anchor",
                     "searchreplace",
                     "visualblocks",
                     "code",
                     "fullscreen",
                     "insertdatetime",
                     "table",
                     "preview",
                     "help",
                     "wordcount",
                  ],
                  toolbar:
                     "undo redo | blocks | " +
                     "bold italic forecolor | alignleft aligncenter " +
                     "alignright alignjustify | bullist numlist outdent indent | " +
                     "removeformat | help",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
                  skin: "oxide-dark",
                  content_css: "dark",
               }}
               onEditorChange={handleTextInput}
               value={text}
            />
         </div>
         <div className="flex gap-2">
            <label htmlFor="isPublished">Would you like to immediately publish this post?</label>
            <input
               type="checkbox"
               name="isPublished"
               id="isPublished"
               checked={isPublished}
               onChange={handlePublishedCheckbox}
            />
         </div>
         {error &&
            (error.errors && error.errors.length > 0 ? (
               error.errors.map((err) => {
                  return (
                     <p key={err.message} className="text-red-500">
                        {err.message}
                     </p>
                  );
               })
            ) : (
               <p className="text-red-500">{error.message}</p>
            ))}
         <button
            className="bg-color1 px-6 py-3 rounded-lg"
            disabled={isLoading}
            onClick={handleSubmitForm}
         >
            {formType === "create" ? "Create" : "Confirm edit"}
         </button>
      </div>
   );
}

PostForm.propTypes = {
   error: PropTypes.any,
   post: PropTypes.object,
   isLoading: PropTypes.bool,
   submitForm: PropTypes.func,
   formType: PropTypes.string,
};
