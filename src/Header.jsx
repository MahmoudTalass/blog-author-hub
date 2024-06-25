import { Link } from "react-router-dom";
import { useAuthContext } from "./Auth/useAuthContext";

export function Header() {
   const { user, userDispatch } = useAuthContext();

   const handleLogout = () => {
      userDispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
   };

   return (
      <header className="p-8 bg-color3">
         <Link to="/">
            <h1 className="text-4xl">Author hub</h1>
         </Link>
         {user && <button onClick={handleLogout}>Logout</button>}
      </header>
   );
}
