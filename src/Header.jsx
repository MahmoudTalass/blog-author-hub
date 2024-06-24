import { useAuthContext } from "./Auth/useAuthContext";

export function Header() {
   const { user, userDispatch } = useAuthContext();

   const handleLogout = () => {
      userDispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
   };

   return (
      <header>
         <h1>Author hub</h1>
         {user && <button onClick={handleLogout}>Logout</button>}
      </header>
   );
}
