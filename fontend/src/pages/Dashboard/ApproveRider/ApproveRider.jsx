import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ApproveRider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const response = await axiosSecure.get("/riders");
      return response.data;
    },
  });

  const updateHandler = async (rider, status) => {
    try {
      const response = await toast.promise(
        axiosSecure.patch(`/rider/update/${rider._id}`, {
          status,
        }),
        {
          loading: "loading...",
          success: `${status} successfully`,
          error: `${status} has been error`,
        }
      );
      if (response.data.modifiedCount) {
        refetch();
        console.log("updated", response.data.modifiedCount);
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  const approveHandler = async (rider) => updateHandler(rider, "approved");
  const rejectHandler = async (rider) => updateHandler(rider, "rejected");

  const deleteApproval = async (id) => {
    if (!id) return;
    try {
      const response = await toast.promise(
        axiosSecure.delete(`/rider/delete/${id}`),
        {
          loading: "loading...",
          success: "rider deleted successfully",
          error: "rider has been error",
        }
      );
      if (response.data?.deletedCount) {
        refetch();
        console.log("Deleted:", response.data.deletedCount);
      }
    } catch (error) {
      console.log("Deleted error", error);
    }
  };

  console.log(riders);

  return (
    <div>
      <h2></h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Status</th>
              <th>District</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider.riderName}</td>
                <td>{rider.riderEmail}</td>
                <td>{rider.district}</td>
                <td
                  className={`${
                    (rider.status === "approved" && "text-green-500") ||
                    (rider.status === "rejected" && "text-red-500") ||
                    (rider.status === "pending" && "text-yellow-500")
                  }`}
                >
                  {rider.status}
                </td>
                <td className="flex gap-5">
                  <button
                    onClick={() => approveHandler(rider)}
                    className="btn btn-accent"
                  >
                    <RiCheckboxCircleFill />
                  </button>
                  <button
                    onClick={() => rejectHandler(rider)}
                    className="btn btn-warning"
                  >
                    <AiFillCloseCircle />
                  </button>
                  <button
                    onClick={() => deleteApproval(rider._id)}
                    className="btn btn-error"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
