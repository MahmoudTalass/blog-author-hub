import { AuthButton } from "./AuthButton";
import { AuthForm } from "./AuthForm";
import { AuthInputField } from "./AuthInputField";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthenticate } from "./useAuthenticate";

export function Signup() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const { user } = useAuthContext();
   const { authenticate, error, isLoading } = useAuthenticate();

   const handleSignup = async (e) => {
      e.preventDefault();

      const body = {
         email,
         password,
         name,
         isAuthor: true,
      };

      await authenticate(body, "signup");

      if (!error) {
         setEmail("");
         setName("");
      }
      setPassword("");
   };

   const handleEmailInput = (e) => {
      setEmail(e.target.value);
   };
   const handlePasswordInput = (e) => {
      setPassword(e.target.value);
   };

   const handleNameInput = (e) => {
      setName(e.target.value);
   };

   if (user) {
      return <Navigate to="/" />;
   }
   return (
      <AuthForm handleAuth={handleSignup}>
         <h2 className="text-4xl">Sign up</h2>
         <AuthInputField
            id="name"
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={handleNameInput}
         />
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
            Already have an account?{" "}
            <Link to="/login" className="underline">
               Login here
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
