import { AuthButton } from "./AuthButton";
import { AuthForm } from "./AuthForm";
import { AuthInputField } from "./AuthInputField";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthenticate } from "./useAuthenticate";

export function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { user } = useAuthContext();
   const { authenticate, error, isLoading } = useAuthenticate();

   const handleLogin = async (e) => {
      e.preventDefault();

      const body = { email, password };
      await authenticate(body, "login");

      if (!error) {
         setEmail("");
      }
      setPassword("");
   };

   const handleEmailInput = (e) => setEmail(e.target.value);
   const handlePasswordInput = (e) => setPassword(e.target.value);

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
            <Link to="/signup" className="underline">
               Sign up here
            </Link>
         </p>
         <AuthButton disabled={isLoading}>Login</AuthButton>
         {error && (
            <div className="text-red-500">
               {error.errors ? (
                  error.errors.map((err) => {
                     return <p key={err.message}>{err.message}</p>;
                  })
               ) : (
                  <p>{error.message}</p>
               )}
            </div>
         )}
      </AuthForm>
   );
}
