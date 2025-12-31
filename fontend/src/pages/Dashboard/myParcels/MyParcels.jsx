import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const parcelDeleteHandler = async (id) => {
    if (!id) return;

    //delete alert
    const result = Swal.fire({
      title: "Are you sure?",
      text: "You are delete the parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if ((await result).isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcel/${id}`);
        if (res.data.deletedCount) {
          refetch();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div>
      <h2>Parcels</h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Parcel Name</th>
              <th>Parcel Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel?.cost}৳</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="btn btn-sm btn-accent">paid</span>
                  ) : (
                    <Link
                      className="btn btn-sm btn-warning"
                      to={`/dashboard/payment/${parcel._id}`}
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td>{parcel.deliveryStatus || "pending"}</td>
                <td className="flex gap-5">
                  <button className="btn btn-sm hover:bg-secondary hover:text-white">
                    <FaRegEdit className="text-md" />
                  </button>
                  <button
                    onClick={() => parcelDeleteHandler(parcel._id)}
                    className="btn btn-sm hover:bg-error"
                  >
                    <MdDelete className="text-lg" />
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

export default MyParcels;
