import { useEffect } from "react";

export function useOutsideClick(ref, setDisplayOptions) {
   useEffect(() => {
      function handleClickOutside(e) {
         if (ref.current && !ref.current.contains(e.target)) {
            setDisplayOptions(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => document.removeEventListener("mousedown", handleClickOutside);
   });
}
