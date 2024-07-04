import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export function AuthButton({ children, disabled }) {
   return (
      <button className="border px-5 py-2 rounded-md" type="submit" disabled={disabled}>
         {disabled ? <FontAwesomeIcon icon={faEllipsis} fade size="2x" /> : children}
      </button>
   );
}
AuthButton.propTypes = {
   children: PropTypes.string,
   disabled: PropTypes.bool,
};
