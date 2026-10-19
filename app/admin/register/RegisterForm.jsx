"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  Input,
  Select,
  SubmitButton,
} from "@/app/components/admin/FormField";

export default function RegisterForm({ roles }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: undefined }));
  }

  function validate() {
    const error = {};
    if (!form.name.trim()) error.name = "Full name is required.";
    if (!form.email.trim()) error.email = "Email is required.";
    if (form.password.length < 8)
      error.password = "Password must be at least 8 characters.";
    if (form.password !== form.confirmPassword)
      error.confirmPassword = "Passwords do not match.";
    if (!form.role) error.role = "Please select a role.";
    return error;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const e_ = validate();
    if (Object.keys(e_).length) {
      setErrors(e_);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      if (!response.ok) {
        const errors = await response.json();
        setErrors(errors.errors);
      }

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role_id: "",
      });
    } catch (err) {
      setErrors({ form: err.message ?? "Registration failed." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          Staff member registered successfully.
        </div>
      )}
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {errors.form}
        </div>
      )}

      <Field label="Full Name" error={errors.name}>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          required
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@imperial.co.ke"
          required
        />
      </Field>

      <Field label="Role" error={errors.role}>
        <Select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select a role…</option>
          {roles.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.role_name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Password" error={errors.password}>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Min. 8 characters"
          required
        />
      </Field>

      <Field label="Confirm Password" error={errors.confirmPassword}>
        <Input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat password"
          required
        />
      </Field>

      <div className="pt-2">
        <SubmitButton loading={loading}>Create Account</SubmitButton>
      </div>
    </form>
  );
}
