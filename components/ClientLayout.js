"use client";
import React, { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useState } from "react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

const ClientLayout = ({ children }) => {
  const { data: session, status } = useSession();
  // console.log("session is : ");
  // console.log(session);
  // console.log("status is : ");
  // console.log(status);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    if (session != "loading") setLoading(false);
  }, [session]);

  return (
    <div className="min-h-[700px] flex items-center justify-center">
      {(loading && (
        <MoonLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )) ||
        children}
    </div>
  );
};

export default ClientLayout;
