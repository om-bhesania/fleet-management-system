import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../../../utils/api/config";
import Cookies from "js-cookie";
import useToast from "../../../hooks/useToast";
import { ToastContainer } from "react-toastify";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    login_api?: string;
    user?: any;
    isLoggedIn?: boolean;
  }
}

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { notify } = useToast();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "superadmin01@gmail.com",
      password: "SUperAdmin@@1224",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch(
          `http://localhost:5500/${api.API_URL.auth.login}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();
        if (response.status === 400) {
          notify({
            message: "Invalid credentials. Please try again.",
            type: "error",
            position: "top-right",
            duration: 5000,
          });
          formik.setErrors({
            email: "Invalid email or password.",
            password: "Invalid email or password.",
          });
        } else if (!response.ok) {
          throw new Error(data.msg || "Something went wrong");
        } else {
          Cookies.set("token", data.token, { path: "/" });
          Cookies.set("user", JSON.stringify(data?.userInfo), { path: "/" });
          window.user = Cookies.get("user");

          notify({
            message: "Successfully logged in",
            type: "success",
            position: "top-right",
            duration: 5000,
          });

          resetForm();

          setTimeout(() => {
            navigate("/");
          }, 900);
          setTimeout(() => {
            window.location.reload();
          }, 900);
        }
      } catch (error: any) {
        notify({
          message: error?.msg || "Failed to log in",
          type: "error",
          position: "top-right",
          duration: 5000,
        });
        window.isLoggedIn = false;
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const isLoggedIn = Cookies.get("token");
    setIsLoggedIn(!isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="container">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {isLoggedIn ? (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="mt-2 text-sm text-red-600">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="mt-2 text-sm text-red-600">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {formik.isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
              <ToastContainer />
            </form>
          </div>
        ) : (
          <>
            <div className=" flex items-center justify-center flex-col gap-5 mt-5">
              <div className="text-4xl capitalize">
                You are already logged in!!
              </div>
              <Link
                to="/"
                className="border-0 bg-blue-500 rounded-md py-2 px-6 text-white text-lg font-medium"
              >
                Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
