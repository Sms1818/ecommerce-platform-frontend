import { useState } from "react";
import { loginUser } from "../api/authApi";
import AuthButton from "../components/auth/AuthButton";
import AuthField from "../components/auth/AuthField";
import AuthLayout from "../components/auth/AuthLayout";
import type { LoginRequest } from "../types/auth";

const Login = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(formData);
      console.log(response);
      alert("Login successful");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in and continue exploring our vibrant marketplace."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          label="Email or username"
          name="emailOrUsername"
          placeholder="you@example.com"
          value={formData.emailOrUsername}
          onChange={handleChange}
        />

        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
        />

        <AuthButton loading={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
