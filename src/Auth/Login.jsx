import { jwtDecode } from "jwt-decode";
import { AuthButton } from "./AuthButton";
import { AuthForm } from "./AuthForm";
import { AuthInputField } from "./AuthInputField";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const { user, userDispatch } = useAuthContext();
   console.log("error", error);

   const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const body = { email, password };
      console.log(e);

      try {
         const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(body),
         });

         const json = await response.json();

         if (!response.ok) {
            setPassword("");
            throw new Error(json.error.message);
         }

         const { id, author } = jwtDecode(json.token);

         const payload = {
            token: json.token,
            id,
            name: json.name,
            author,
         };

         const localStorageUserObj = { name: payload.name, token: payload.token };
         localStorage.setItem("user", JSON.stringify(localStorageUserObj));

         userDispatch({ action: "LOGIN", payload });
         setError(null);
         setEmail("");
         setPassword("");
      } catch (err) {
         setError(err);
      } finally {
         setIsLoading(false);
      }
   };

   const handleEmailInput = (e) => {
      setEmail(e.target.value);
   };
   const handlePasswordInput = (e) => {
      setPassword(e.target.value);
   };

   if (user) {
      return <Navigate to="/" />;
   }

   return (
      <AuthForm handleAuth={handleLogin}>
         <h2 className="text-4xl">Login</h2>
         <AuthInputField
            id="email"
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailInput}
         />
         <AuthInputField
            id="password"
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
         />
         <p>
            New user?{" "}
            <Link to="signup" className="underline">
               Sign up here
            </Link>
         </p>
         <AuthButton disabled={isLoading}>Login</AuthButton>
         {error && (
            <div>
               {error.errors.length > 0 ? (
                  error.errors.map((err) => {
                     return (
                        <p className="text-red-500" key={err.message}>
                           {err.message}
                        </p>
                     );
                  })
               ) : (
                  <p className="text-red-500">{error.message}</p>
               )}
            </div>
         )}
      </AuthForm>
   );
}
