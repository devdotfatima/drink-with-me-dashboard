import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginTypeT } from "../../../shared/lib/validations";
// import { login } from "../../../api/authAPI";
import { useNavigate } from "react-router";
import { useAuth } from "../../../Providers/AuthProvider";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginTypeT>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginTypeT) => {
    try {
      // await login(data.email, data.password);
      console.log(data);
      

      navigate("/");
      // Redirect the user to another page if needed
    } catch (error: unknown) {
      console.error("Login Error:", error);

      // Type guard to check if error is an object with a `code` property
      if (typeof error === "object" && error !== null && "code" in error) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === "auth/invalid-credential") {
          setError("password", {
            type: "server",
            message: "Invalid Credentials. Please try again.",
          });
        } else {
          setError("root", {
            type: "server",
            message: "An unexpected error occurred. Please try again.",
          });
        }
      } else {
        setError("root", {
          type: "server",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); // Redirect if already logged in
    }
  }, [user, navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {errors.root && (
            <p className="mt-2 text-sm text-red-600">{errors.root.message}</p>
          )}

          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-900 text-sm/6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                 value={"superadmin@gmail.com"}
                autoComplete="email"
                {...register("email")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-primary-600 hover:text-primary-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                type="password"
                value={"superadmin"}
                autoComplete="current-password"
                {...register("password")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-600-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
