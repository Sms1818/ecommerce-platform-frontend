import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import AuthButton from "../components/auth/AuthButton";
import AuthField from "../components/auth/AuthField";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";
import type { LoginRequest } from "../types/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    emailOrUsername: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
    setError(null);

    try {
      const response = await loginUser(formData);
      login({
        response: response.response,
        token: response.token ?? null,
      });
      navigate("/dashboard");
    } catch {
      setError("Invalid email/username or password.");
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
        {error ? (
          <p className="rounded-lg border border-ruby/20 bg-ruby/5 px-4 py-3 text-sm text-ruby-deep">
            {error}
          </p>
        ) : null}

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
