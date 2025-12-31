import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AuthLayout from "../Layout/AuthLayout";
import Protected from "../Protected/Protected";
import BeARider from "../pages/Be-A-Rider/BeARider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../pages/Dashboard/myParcels/MyParcels";
import Payment from "../pages/Dashboard/Payments/Payment";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payments/PaymentCancelled";
import PaymentHistoty from "../pages/PaymentHistory/PaymentHistoty";
import ApproveRider from "../pages/Dashboard/ApproveRider/ApproveRider";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, path: "/", Component: Home },
        {
          index: true,
          path: "coverage",
          Component: Coverage,
          loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
        },
        {
          index: true,
          path: "rider",
          loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
          element: (
            <Protected>
              <BeARider />
            </Protected>
          ),
        },
        {
          index: true,
          path: "send-parcel",
          loader: () => fetch("/serviceCenter.json").then((res) => res.json()),

          element: (
            <Protected>
              <SendParcel />
            </Protected>
          ),
        },
      ],
    },
    {
      path: "/",
      Component: AuthLayout,
      children: [
        { path: "/login", Component: Login },
        { path: "/register", Component: Register },
      ],
    },
    {
      path: "dashboard",
      element: (
        <Protected>
          <DashboardLayout />
        </Protected>
      ),
      children: [
        { path: "my-parcels", Component: MyParcels },
        { path: "payment/:parcelId", Component: Payment },
        { path: "payment-success", Component: PaymentSuccess },
        { path: "payment-cancelled", Component: PaymentCancelled },
        { path: "payment-history", Component: PaymentHistoty },
        { path: "approve-rider", Component: ApproveRider },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default AppRouter;
