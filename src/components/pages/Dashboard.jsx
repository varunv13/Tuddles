import React from "react";
import Wrapper from "../Layout/wrapper";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(auth?.user);
  const profilePic = auth?.user?.profile_Image;
  const role = auth?.user?.user_Role;
  const name = auth?.user?.user_Name;
  const email = auth?.user?.email;

  // ISO formatted date
  const joinDateISO = auth?.user?.created_at;
  const joiningDate = new Date(joinDateISO);

  const DashboardButton = ({ label, path = "#" }) => {
    const navigate = useNavigate();

    return (
      <button
        onClick={() => navigate(path)}
        className="w-full px-4 py-2 bg-blue-600 rounded-lg text-white font-medium shadow hover:bg-blue-700 transition">
        {label}
      </button>
    );
  };

  // Function for converting Date to string
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  // Date of joining
  const join = formatDate(joiningDate);

  return (
    <Wrapper>
      <div className="min-h-screen w-full bg-zinc-900 py-8 px-4 flex flex-col items-center gap-6">
        {/* Profile Card */}
        <div className="w-full max-w-xl px-6 py-6 rounded-3xl bg-zinc-800 bg-opacity-60 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md flex flex-col items-center text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
          <img
            src={
              profilePic ||
              "https://media.istockphoto.com/id/1476171646/photo/young-woman-ready-for-job-business-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=sjeKzIKtiaJIc0hoGE19u3_jJxERowxVOdbeDpXM_J8="
            }
            height={100}
            width={100}
            className="rounded-full border-4 border-blue-400 shadow-lg"
            alt="profile"
          />
          <h1 className="text-2xl font-bold mt-4 tracking-wide">
            {name?.toUpperCase()}
          </h1>
          <h2 className="text-blue-300 text-sm font-semibold uppercase tracking-widest">
            {role}
          </h2>
          <p className="text-zinc-300">{email}</p>
          <p className="text-zinc-400 mt-2">
            <span className="font-semibold text-white">Joined:</span> {join}
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-5 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-300 shadow-md">
            Edit Profile
          </button>
        </div>

        {/* Role-based Dashboard */}
        {(role === "seller" || role === "admin" || role === "vet") && (
          <div className="w-full max-w-xl bg-zinc-800 bg-opacity-60 backdrop-blur-lg rounded-3xl px-6 py-8 text-white shadow-xl">
            <h1 className="text-center text-xl font-bold mb-6 text-blue-300">
              Dashboard
            </h1>
            <div className="flex flex-col gap-4">
              {role === "seller" && (
                <>
                  <DashboardButton
                    label="Create Product"
                    path="/dashboard/createproduct"
                  />
                  <DashboardButton
                    label="Update Product"
                    path="/dashboard/own-product"
                  />
                  <DashboardButton label="Orders" path="/dashboard" />
                </>
              )}
              {role === "admin" && (
                <>
                  <DashboardButton label="Create Category" />
                  <DashboardButton label="Order Update" path="/dashboard/admin/update-order"/>
                  <DashboardButton label="Set Appointments" />
                </>
              )}
              {role === "vet" && <DashboardButton label="Appointments" />}
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
