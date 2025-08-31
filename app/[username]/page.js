import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { isUser } from "@/actions/userActions";
import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";

const Page =async ({params}) => {
  const {username} = await params;
  //console.log(username)
  
  const user = await isUser(username)
  console.log(user)
  if(user == null){
    notFound()
  }
  else if(user.razorpayId == "" | user.razorpaySecret == ""){
    notFound()
  }
  return (
    <div className="w-full h-full">
      <PaymentPage params={params}/>
    </div>
    
  );
};

export default Page;
