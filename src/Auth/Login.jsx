import { AuthButton } from "./AuthButton";
import { AuthForm } from "./AuthForm";
import { AuthInputField } from "./AuthInputField";

export function Login() {
   return (
      <AuthForm>
         <h2 className="text-4xl">Login</h2>
         <AuthInputField id="email" type="email" label="Email" name="email" />
         <AuthInputField id="password" type="password" label="Password" name="password" />
         <AuthButton>Login</AuthButton>
      </AuthForm>
   );
}
