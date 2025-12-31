import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { MdDirectionsBike, MdPayment } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { MdDashboard } from "react-icons/md";
import logo from "../assets/logo.png";
import Logo from "../components/Logo/Logo";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-6"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="w-full flex items-center gap-5 justify-end">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />{" "}
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            <div>
              {/* notification  */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {/* profile  */}
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            <div className="p-4 w-full">
              <div className="is-drawer-close:hidden flex items-center gap-2">
                <Logo path="/" />
              </div>

              <div className="is-drawer-open:hidden flex justify-center">
                <img src={logo} alt="logo" className="w-20  rounded-full" />
              </div>
            </div>

            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
                to="/dashboard"
              >
                <MdDashboard className="text-lg" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="MyParcels"
                to="/dashboard/my-parcels"
              >
                <LiaProductHunt className="text-lg" />
                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment History"
                to="/dashboard/payment-history"
              >
                <MdPayment className="text-lg" />
                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Approve Rider"
                to="/dashboard/approve-rider"
              >
                <MdDirectionsBike className="text-lg" />
                <span className="is-drawer-close:hidden">Approve Rider</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
