import { AuthForm } from "@/components/forms/auth-form";

export default function RegisterPage() {
  return (
    <div className="shell py-14">
      <AuthForm mode="register" />
    </div>
  );
}
