import PropTypes from "prop-types";

export function AuthForm({ children, onSubmit }) {
   return (
      <div className="w-full flex justify-center">
         <form
            className="w-[400px] min-w-[300px] bg-color1 flex flex-col items-center p-4 gap-6 mt-10 rounded-md"
            onSubmit={onSubmit}
         >
            {" "}
            {children}
         </form>
      </div>
   );
}

AuthForm.propTypes = {
   children: PropTypes.any,
   onSubmit: PropTypes.func,
};
