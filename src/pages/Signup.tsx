import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/authApi";
import AuthButton from "../components/auth/AuthButton";
import AuthField from "../components/auth/AuthField";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";
import type { SignUpRequest } from "../types/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignUpRequest>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    profileImageUrl: "",
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
      const response = await signupUser(formData);
      login({
        response: response.response,
        token: response.token ?? null,
      });
      navigate("/dashboard");
    } catch {
      setError("Could not create account. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      wide
      title="Join the bazaar"
      subtitle="Create your account and discover handpicked collections from across India."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? (
          <p className="rounded-lg border border-ruby/20 bg-ruby/5 px-4 py-3 text-sm text-ruby-deep">
            {error}
          </p>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            label="First name"
            name="firstName"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleChange}
          />
          <AuthField
            label="Last name"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            label="Username"
            name="userName"
            placeholder="janedoe"
            value={formData.userName}
            onChange={handleChange}
          />
          <AuthField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            label="Phone"
            name="phoneNumber"
            placeholder="+91 98765 43210"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <AuthField
            label="Date of birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            as="select"
          >
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </AuthField>
          <AuthField
            label="Profile image URL"
            name="profileImageUrl"
            placeholder="https://..."
            value={formData.profileImageUrl}
            onChange={handleChange}
          />
        </div>

        <AuthButton loading={loading}>
          {loading ? "Creating account…" : "Create account"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Signup;
