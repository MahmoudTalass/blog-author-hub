import PropTypes from "prop-types";

export function AuthButton({ children }) {
   return (
      <button className="border px-5 py-2 rounded-md" type="submit">
         {children}
      </button>
   );
}
AuthButton.propTypes = {
   children: PropTypes.string,
};
