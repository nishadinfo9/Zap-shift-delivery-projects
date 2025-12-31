import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import biker from "../../assets/agent-pending.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BeARider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const serviceCenter = useLoaderData();
  const duplicateRegion = serviceCenter.map((reg) => reg.region);
  const regions = [...new Set(duplicateRegion)];

  const watchSenderDistrict = useWatch({ control, name: "district" });

  const riderDistrict = (region) => {
    const filterDistrict = serviceCenter.filter((reg) => reg.region === region);
    const district = filterDistrict.map((dis) => dis.district);
    return district;
  };

  const beARiderHandler = async (data) => {
    if (!data) return;

    try {
      const response = await toast.promise(axiosSecure.post("/rider", data), {
        loading: "loading...",
        success: "applied successfully",
        error: "applied faild",
      });

      if (response.data.insertedId) {
        console.log("inserted ID", response.data.insertedId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg bg-base-200 py-10 px-5 md:p-20 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE CONTENT */}
        <div>
          <h2 className="md:text-5xl font-bold text-secondary">Be A Rider</h2>
          <h3 className="md:w-md text-sm my-5 text-secondary">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </h3>

          <form onSubmit={handleSubmit(beARiderHandler)}>
            <div className="w-2xl">
              {/* dividar  */}
              <div className="divider"></div>

              <fieldset className="fieldset grid grid-cols-1 gap-x-10 gap-y-5">
                <label className="label text-2xl font-bold text-secondary">
                  Tell Us About Yourself
                </label>

                {/* Name  */}
                <div className="">
                  <label className="label text-lg text-black">Your Name</label>
                  <input
                    type="text"
                    className="input w-full "
                    placeholder="Your Name"
                    defaultValue={user?.displayName}
                    {...register("riderName")}
                  />
                </div>

                {/* Email  */}
                <div className="">
                  <label className="label text-lg text-black">
                    Your email adress
                  </label>
                  <input
                    type="email"
                    className="input w-full "
                    placeholder="Your email adress"
                    defaultValue={user?.email}
                    readOnly
                    {...register("riderEmail")}
                  />
                </div>

                {/* Driving License  */}
                <div className="">
                  <label className="label text-lg text-black">
                    Driving License
                  </label>
                  <input
                    type="number"
                    className="input w-full "
                    placeholder="Driving License"
                    {...register("drivingLicense")}
                  />
                </div>

                {/* Your District */}
                <div className="w-full space-y-2">
                  <div>
                    <label className="label text-lg text-black">
                      Your District
                    </label>
                    <select
                      defaultValue="Your District"
                      className="select appearance-none w-full"
                      {...register("district")}
                    >
                      <option disabled={true}>Select Your District</option>
                      {regions.map((reg, i) => (
                        <option key={i} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label text-lg text-black">
                      Your Rigion
                    </label>
                    <select
                      defaultValue="Your Rigion"
                      className="select appearance-none w-full"
                      {...register("yourRigion")}
                    >
                      <option disabled={true}>Select Your Rigion</option>
                      {riderDistrict(watchSenderDistrict).map((reg, i) => (
                        <option key={i} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* NID No  */}
                <div className="">
                  <label className="label text-lg text-black">NID No</label>
                  <input
                    type="number"
                    className="input w-full "
                    placeholder="NID No"
                    {...register("nidNo")}
                  />
                </div>

                {/* Phone Number  */}
                <div className="">
                  <label className="label text-lg text-black">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="input w-full "
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                </div>
                {/* Bike Brand Model and Year  */}
                <div className="">
                  <label className="label text-lg text-black">
                    Bike Brand Model and Year
                  </label>
                  <input
                    type="text"
                    className="input w-full "
                    placeholder="Bike Brand Model and Year"
                    {...register("bikeModelYear")}
                  />
                </div>

                {/* Bike Register Number  */}
                <div className="">
                  <label className="label text-lg text-black">
                    Bike Register Number
                  </label>
                  <input
                    type="number"
                    className="input w-full "
                    placeholder="Bike Register Number"
                    {...register("bikeRegisterNumber")}
                  />
                </div>

                {/* textaeria  */}
                <fieldset className="fieldset">
                  <label className="label text-lg text-black">
                    Tell Us About Yourself
                  </label>
                  <textarea
                    className="textarea h-24 w-full"
                    placeholder="Tell Us About Yourself"
                    {...register("aboutYourself")}
                  ></textarea>
                </fieldset>
              </fieldset>

              <input
                className="btn mt-5 w-full btn-primary text-black"
                type="submit"
                value={"Apply As A Rider"}
              />
            </div>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img className="max-w-xs md:max-w-sm" src={biker} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
