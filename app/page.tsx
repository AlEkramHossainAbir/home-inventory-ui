"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      stayLoggedIn: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      // Error is handled by the mutation
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex font-inter">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 login-gradient items-center justify-center p-12">
        <div className="max-w-md flex flex-col items-center gap-12">
          <Image
            src="/bookshelf.svg"
            alt="Organized bookshelf illustration"
            width={400}
            height={400}
            priority
            className="w-full h-auto"
          />

          <div className="flex flex-col gap-3 text-center">
            <div className="text-2xl font-semibold text-center organize-title">
              Organize Everything
            </div>
            <p className="organize-description text-base font-normal">
              Keep track of your belongings, warranties, and important
              <br />
              documents all in one secure place.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8 flex flex-col items-center gap-3 ">
            <div className="inline-flex items-center justify-center w-12 h-12 btn-primary rounded-xl">
              <Image
                src="/Home.svg"
                alt="Home Inventory"
                width={48}
                height={48}
                className="w-8 h-8"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold leading-none heading-primary">
                Home Inventory
              </div>
              <div className="font-normal text-sm leading-none sub-text-secondary">
                Track and organize your things
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-solid border-[#E2E8F0] login-container">
            <h2 className="text-xl font-semibold heading-primary mb-6">
              Sign in to your account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    {...register("username")}
                    id="username"
                    type="email"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus-ring-primary focus:border-transparent outline-none transition-all"
                    style={
                      { "--tw-ring-color": "#3B82F6" } as React.CSSProperties
                    }
                    aria-invalid={errors.username ? "true" : "false"}
                    aria-describedby={
                      errors.username ? "username-error" : undefined
                    }
                  />
                  <Image
                    src="/user.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="absolute right-3 top-3 w-5 h-5"
                  />
                </div>
                {errors.username && (
                  <p
                    id="username-error"
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus-ring-primary focus:border-transparent outline-none transition-all"
                    style={
                      { "--tw-ring-color": "#3B82F6" } as React.CSSProperties
                    }
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <Image
                      src="/eye.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    className="mt-1.5 text-sm text-red-600"
                    role="alert"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    {...register("stayLoggedIn")}
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 rounded focus:ring-2"
                    style={{ accentColor: "#3B82F6" }}
                  />
                  <span className="ml-2 text-sm font-normal remember-me">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium"
                  style={{ color: "#3B82F6" }}
                >
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {loginMutation.isError && (
                <div
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  role="alert"
                >
                  <p className="text-sm text-red-600">
                    {loginMutation.error?.message ||
                      "Login failed. Please try again."}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full btn-primary text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
                aria-label="Sign in to your account"
              >
                {loginMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <Image
                      src="/right-arrow.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              {/* Create Account Link */}
              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="font-medium"
                  style={{ color: "#3B82F6" }}
                >
                  Create one
                </a>
              </p>
            </form>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex flex-col items-center justify-center gap-2 text-xs bottom-footer-text">
            <div>
              <span>Version 1.2.4</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="hover:text-gray-700">
                Help Center
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-700">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
