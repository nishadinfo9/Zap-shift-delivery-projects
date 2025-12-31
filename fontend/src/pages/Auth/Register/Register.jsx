import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const { UserProfile, createUser, loggedInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    if (!data) return;
    const { name, email, password, photoURL } = data;
    const response = await createUser(email, password);
    console.log("response", response);
    if (!response) return;
    const userData = {
      displayName: name,
      email: email,
      photoURL: photoURL,
    };
    const createDBUser = await axiosSecure.post("/user", userData);
    if (createDBUser) {
      console.log("user created batabase");
    }
    await UserProfile(name, photoURL);
    reset();
    navigate(location?.state || "/");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-center ">Create an Account</h2>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset mx-auto w-sm space-y-2 my-5">
          <label className="label w-full font-bold">Name</label>
          <input
            {...register("name", {
              required: true,
              pattern: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
            })}
            type="text"
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
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
          <label className="label w-full font-bold">photoURL</label>
          <input
            {...register("photoURL", { required: true })}
            type="input"
            className="input w-full"
            placeholder="photoURL"
          />
          {errors.photoURL?.type === "required" && (
            <p className="text-red-500">photoURL is required</p>
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
            Rgister
          </button>
          <Link
            state={location.state}
            to={"/login"}
            className="link link-hover text-green-500"
          >
            Already have an account? Login
          </Link>
        </fieldset>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
