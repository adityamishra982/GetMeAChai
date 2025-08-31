"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { isUser, updateUser } from "@/actions/userActions";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const notify = () => toast("Profile Updated.");
  const notifyProblem = () => toast("Sorry that username isn't available.");
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }
  const [credentialsForm, setCredentialsForm] = useState({
    name: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const handleChange = (e) => {
    setCredentialsForm({ ...credentialsForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await isUser(session.user.username);
    console.log(user)
    console.log(session)
    if (user && user.email !== session.user.email) {
      notifyProblem();
    } else {
      await updateUser(session.user.email, credentialsForm);
      notify();
      setCredentialsForm({
        name: "",
        username: "",
        profilepic: "",
        coverpic: "",
        razorpayId: "",
        razorpaySecret: "",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="text-white p-4">
        <h1 className="text-2xl text-white font-bold text-center">
          Welcome to your Dashboard
        </h1>
        <form action="" className="my-2 max-w-2xl mx-auto">
          <input
            type="text"
            className="bg-gray-700 w-full p-2 my-2 rounded-lg"
            placeholder="Enter Name"
            name="name"
            value={credentialsForm.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="bg-gray-700 w-full p-2 my-2 rounded-lg"
            placeholder="Enter Username"
            name="username"
            value={credentialsForm.username}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="bg-gray-700 w-full p-2 my-2 rounded-lg"
            placeholder="Profile Picture"
            name="profilepic"
            value={credentialsForm.profilepic}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="bg-gray-700 w-full p-2 my-2 rounded-lg"
            placeholder="Cover Picture"
            name="coverpic"
            value={credentialsForm.coverpic}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="bg-gray-700 w-full p-2 my-2 rounded-lg"
            placeholder="Razorpay Id"
            name="razorpayId"
            value={credentialsForm.razorpayId}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            className="bg-gray-700 w-full p-2 my-2 rounded-lg"
            placeholder="Razorpay Secret"
            name="razorpaySecret"
            value={credentialsForm.razorpaySecret}
            onChange={(e) => handleChange(e)}
          />
          <button
            className="text-white w-full bg-blue-500 py-4 px-6 rounded-2xl font-bold my-2"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
