import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    if (!data) return;
    const { email, password } = data;
    await loggedInUser(email, password);
    navigate(location?.state || "/");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-center ">Welcome Back</h2>
      <p className="text-xl font-bold text-center">Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset mx-auto w-sm space-y-2 my-5">
          <label className="label w-full font-bold">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">email is required</p>
          )}
          <label className="label font-bold">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="input w-full"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password must be 6 character longer</p>
          )}
          <button type="submit" className="btn w-sm btn-neutral">
            Login
          </button>
          <Link
            state={location.state}
            to={"/register"}
            className="link link-hover text-green-500"
          >
            Now to zap shift, Register
          </Link>
        </fieldset>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
