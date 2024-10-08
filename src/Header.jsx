import { Link } from "react-router-dom";
import { useAuthContext } from "./auth/useAuthContext";

export function Header() {
   const { user, userDispatch } = useAuthContext();

   const handleLogout = () => {
      userDispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
   };

   return (
      <header className="p-8 bg-color3 flex justify-center">
         <div className="flex justify-between max-w-[1400px] w-full">
            <Link to="/">
               <h1 className="text-4xl">Author hub</h1>
            </Link>
            {user && <button onClick={handleLogout}>Logout</button>}
         </div>
      </header>
   );
}
