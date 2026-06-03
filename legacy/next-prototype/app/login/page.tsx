import { AuthForm } from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <div className="shell py-14">
      <AuthForm mode="login" />
    </div>
  );
}
