import { AuthButton } from "./AuthButton";
import { AuthForm } from "./AuthForm";
import { AuthInputField } from "./AuthInputField";

export function Signup() {
   return (
      <AuthForm>
         <h2 className="text-4xl">Sign up</h2>
         <AuthInputField id="name" type="text" label="Name" name="name" />
         <AuthInputField id="email" type="email" label="Email" name="email" />
         <AuthInputField id="password" type="password" label="Password" name="password" />
         <AuthButton>Sign up</AuthButton>
      </AuthForm>
   );
}
