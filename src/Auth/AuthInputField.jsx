import PropTypes from "prop-types";

export function AuthInputField({ name, type, label, id, value, onChange }) {
   return (
      <div className="flex flex-col items-center w-full gap-2">
         <label htmlFor={id} className="text-xl">
            {label}
         </label>
         <input
            type={type}
            id={id}
            name={name}
            required
            className="bg-color3 rounded w-5/6 h-7 px-2"
            autoComplete="true"
            onChange={onChange}
            value={value}
         />
      </div>
   );
}

AuthInputField.propTypes = {
   name: PropTypes.string,
   type: PropTypes.string,
   label: PropTypes.string,
   id: PropTypes.string,
   value: PropTypes.string,
   onChange: PropTypes.func,
};
