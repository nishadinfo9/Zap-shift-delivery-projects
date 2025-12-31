import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  const watchSenderDistrict = useWatch({ control, name: "yourDistrict" });
  const watchReciverDistrict = useWatch({ control, name: "reciverDistrict" });

  const filterByDistrict = (region) => {
    const filterDistrict = serviceCenter.filter((reg) => reg.region === region);
    const district = filterDistrict.map((dis) => dis.district);
    return district;
  };

  const parcelHandler = (data) => {
    if (!data) return;
    const Weight = parseFloat(data.parcelWeight);
    const isDocuments = data.percelType === "document";
    const isSameDistrict = data.yourDistrict === data.reciverDistrict;

    let cost = 0;
    if (isDocuments) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (Weight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minimumCost = isSameDistrict ? 110 : 150;
        const extraWeight = Weight - 3;
        const extraCost = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minimumCost + extraCost;
      }
    }
    data.cost = cost;

    //alert
    Swal.fire({
      title: `Confirm and continue payments ${cost} taka`,
      text: "You may cancel",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "agree",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcel", data).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-parcels");
          }
        });
      }
    });
  };

  return (
    <div className="rounded-lg bg-base-200 py-10 px-5 md:p-20 w-full">
      <div>
        <h2 className="md:text-5xl font-bold text-secondary">Send A Parcel</h2>
        <h3 className="font-black text-2xl text-secondary">
          Enter your parcel details
        </h3>
        <form onSubmit={handleSubmit(parcelHandler)}>
          <div className="my-5 p-4">
            {/* document  */}
            <label className="lebel mr-4">
              <input
                type="radio"
                value={"document"}
                className="radio radio-primary cursor-pointer"
                {...register("percelType")}
                defaultChecked
              />
              Document
            </label>

            <label className="lebel">
              <input
                type="radio"
                value={"non-document"}
                className="radio radio-primary cursor-pointer"
                {...register("percelType")}
              />
              Non-Document
            </label>
          </div>
          <div>
            {/* first fields  */}
            <fieldset className="fieldset grid grid-cols-2 gap-10">
              <div className="">
                <label className="label text-lg text-black">Parcel Name</label>
                <input
                  type="text"
                  className="input w-full "
                  placeholder="Parcel Name"
                  {...register("parcelName")}
                />
              </div>
              <div className="">
                <label className="label text-lg text-black">
                  Parcel Weight (KG)
                </label>
                <input
                  type="number"
                  className="input w-full "
                  placeholder="Parcel Weight (KG)"
                  {...register("parcelWeight")}
                />
              </div>
            </fieldset>

            {/* dividar  */}
            <div className="divider"></div>

            {/* second fields  */}

            <fieldset className="fieldset grid grid-cols-2 gap-x-10 gap-y-5">
              <label className="label text-2xl font-bold text-secondary">
                Sender Details
              </label>
              <label className="label text-2xl font-bold text-secondary">
                Revicer Details
              </label>

              {/* Name  */}
              <div className="">
                <label className="label text-lg text-black">Sender Name</label>
                <input
                  type="text"
                  className="input w-full "
                  placeholder="Sender Name"
                  defaultValue={user?.displayName}
                  readOnly
                  {...register("senderName")}
                />
              </div>
              <div className="">
                <label className="label text-lg text-black">
                  Receiver Name
                </label>
                <input
                  type="text"
                  className="input w-full "
                  placeholder="Receiver Name"
                  {...register("receiverName")}
                />
              </div>
              {/* Email  */}
              <div className="">
                <label className="label text-lg text-black">
                  Sender email adress
                </label>
                <input
                  type="email"
                  className="input w-full "
                  placeholder="Sender email adress"
                  defaultValue={user?.email}
                  readOnly
                  {...register("senderEmail")}
                />
              </div>
              <div className="">
                <label className="label text-lg text-black">
                  Receiver email address
                </label>
                <input
                  type="email"
                  className="input w-full "
                  placeholder="Receiver email address"
                  {...register("receiverEmail")}
                />
              </div>

              {/* select fields  */}

              {/* sender and reciver districk  */}
              <div className="w-full space-y-2">
                <div>
                  <label className="label text-lg text-black">
                    Your District
                  </label>
                  <select
                    defaultValue="Your District"
                    className="select appearance-none w-full"
                    {...register("yourDistrict")}
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
                    {filterByDistrict(watchSenderDistrict).map((reg, i) => (
                      <option key={i} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* sender and reciver and rigion  */}
              <div className="w-full space-y-2">
                <div>
                  <label className="label text-lg text-black">
                    Reciver District
                  </label>
                  <select
                    defaultValue="Reciver District"
                    className="select appearance-none w-full"
                    {...register("reciverDistrict")}
                  >
                    <option disabled={true}>Select Reciver District</option>
                    {regions.map((reg, i) => (
                      <option key={i} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label text-lg text-black">
                    Receiver Region
                  </label>
                  <select
                    defaultValue="Reciver Region"
                    className="select appearance-none w-full"
                    {...register("reciverRegion")}
                  >
                    <option disabled={true}>Select Reciver Region</option>
                    {filterByDistrict(watchReciverDistrict).map((reg, i) => (
                      <option key={i} value={reg}>
                        {reg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address  */}
              <div className="">
                <label className="label text-lg text-black">
                  Sender Address
                </label>
                <input
                  type="text"
                  className="input w-full "
                  placeholder="Sender Address"
                  {...register("senderAddress")}
                />
              </div>
              <div className="">
                <label className="label text-lg text-black">
                  Receiver Address
                </label>
                <input
                  type="text"
                  className="input w-full "
                  placeholder="Receiver Address"
                  {...register("receiverAddress")}
                />
              </div>

              {/* textaeria  */}
              <fieldset className="fieldset">
                <label className="label text-lg text-black">
                  Pickup Instruction
                </label>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Pickup Instruction"
                  {...register("pickupInstruction")}
                ></textarea>
              </fieldset>

              <fieldset className="fieldset">
                <label className="label text-lg text-black">
                  Receiver District
                </label>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Delivery Instruction"
                  {...register("deliveryInstruction")}
                ></textarea>
              </fieldset>
            </fieldset>

            <div className="my-10">
              <p>* PickUp Time 4pm-7pm Approx.</p>
              <div className="mt-5">
                <input
                  className="btn btn-primary text-black"
                  type="submit"
                  value={"Proceed to Confirm Booking"}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
