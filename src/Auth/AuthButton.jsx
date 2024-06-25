import PropTypes from "prop-types";

export function AuthButton({ children, disabled }) {
   return (
      <button className="border px-5 py-2 rounded-md" type="submit" disabled={disabled}>
         {children}
      </button>
   );
}
AuthButton.propTypes = {
   children: PropTypes.string,
   disabled: PropTypes.bool,
};
