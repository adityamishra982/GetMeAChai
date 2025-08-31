"use client";
import React from "react";
import Script from "next/script";
import Image from "next/image";
import { initiate } from "@/actions/userActions";
import { useState, useEffect } from "react";
import { confirmPayment } from "@/actions/userActions";
import { fetchPayments } from "@/actions/userActions";
import { fetchUser } from "@/actions/userActions";
import { MoonLoader } from "react-spinners";

const PaymentPage = ({ params }) => {
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };
  const validateCredentials = () => {
    if(credentialsForm.profilepic != "" && credentialsForm.coverpic != ""){
      console.log("credentials form is")
      console.log(credentialsForm)
    }
  }
  let user;
  const getData = async () => {
    let p = await fetchPayments(to_user);
    user = await fetchUser(to_user);
    setPaymentsArr(p);
    setCredentialsForm(user);
    console.log("user is");
    console.log(user);
    setLoading(false);
    //validateCredentials()
  };
  const to_user = JSON.parse(params.value).username;
  const [paymentsArr, setPaymentsArr] = useState([]);
  const totalAmount = paymentsArr.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const [credentialsForm, setCredentialsForm] = useState({
    name: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  });
  useEffect(() => {
    getData();
  }, []);
  useEffect(()=> {
    validateCredentials();
  }, [credentialsForm])
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await payNow(paymentform.amount);
    setpaymentform({ name: "", message: "", amount: "" });
    getData();
  };

  const createOrderId = async (amount) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
          user_razorpay_id: credentialsForm.razorpayId,
          user_razorpay_secret: credentialsForm.razorpaySecret,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const payNow = async (Amount) => {
    try {
      const orderId = await createOrderId(Amount);
      const options = {
        key: credentialsForm.razorpayId,
        amount: parseFloat(Amount) * 100,
        currency: "INR",
        name: paymentform.name,
        description: paymentform.message,
        order_id: orderId,
        handler: async function (response) {
          // console.log("response object is");
          // console.log(response);
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          // console.log("data passed to api/verify : ");
          // console.log(data);
          await initiate(orderId, Amount, to_user, paymentform);
          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.isOk) {
            await confirmPayment(orderId);
            getData();
          } else {
            alert(res.message);
          }
        },
        prefill: {
          name: "Get Me a Chai",
          email: "aditya.mishraa209@gmail.com",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert(response.error.description);
      });
      paymentObject.open();
      //console.log(paymentform);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {(loading && (
        <div className="min-h-[700px] flex items-center justify-center">
          <MoonLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )) || (
        <div className="h-full w-full">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          <div className="text-white w-full flex flex-col items-center">
            <div className="w-full">
              <Image
                src={credentialsForm.coverpic}
                alt="cover picture"
                width={100}
                height={100}
                className="w-full h-80"
                unoptimized
              />
              <Image
                src={credentialsForm.profilepic}
                alt="profile picture"
                width={100}
                height={100}
                className="w-30 h-30 left-1/2 -translate-x-1/2 absolute rounded-2xl -translate-y-1/2"
                unoptimized
              />
              <p className="text-center text-white mt-17">@{to_user}</p>
              <p className="text-center text-gray-400 text-sm my-1">
                Let&apos;s help {to_user} get a chai!
              </p>
              <ul className="text-gray-400 text-sm flex gap-4 justify-center">
                <li>{paymentsArr.length} Payments</li>
                <li>{totalAmount} raised</li>
              </ul>
            </div>
            <div className="my-2 lg:flex justify-center gap-2 p-4 md:[pd-0] w-full">
              <div className="bg-gray-800 w-full my-4 px-4 py-6 lg:ml-20  lg:w-1/2 rounded-2xl">
                <h1 className="text-xl font-bold">Supporters</h1>
                <div className="text-white w-full mx-2 my-4">
                  {paymentsArr.length ? (
                    paymentsArr.map((pay, idx) => (
                      <div key={idx} className="flex gap-2 my-2">
                        <div className="h-full w-fit">
                          <Image
                            src="https://imgs.search.brave.com/h8F4iiVN8U8zKwpgk8JznRMNcCZrXMICVmWU1vJLrkg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/NDEyLzcyNy9zbWFs/bC91c2VyLWF2YXRh/ci1pbGx1c3RyYXRp/b24tdmVjdG9yLmpw/Zw"
                            alt="profile picture"
                            width={35}
                            height={35}
                            className="rounded-full"
                            unoptimized
                          />
                        </div>
                        <div className="h-full">
                          <span>
                            {pay.name} donated{" "}
                            <span className="font-bold">₹{pay.amount}</span>{" "}
                            with a Message &quot;<span>{pay.message}</span>
                            &quot;
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No payments to show</div>
                  )}
                </div>
              </div>
              <div className="bg-gray-800 w-full my-4 px-4 py-6 lg:mr-20 lg:w-1/2 rounded-2xl">
                <h1 className="text-xl font-bold">Make a Payment</h1>
                <form className="my-2 payment-form">
                  <input
                    type="text"
                    className="bg-gray-700 w-full p-2 my-1 rounded-lg"
                    placeholder="Enter Name"
                    name="name"
                    value={paymentform.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="text"
                    className="bg-gray-700 w-full p-2 my-1 rounded-lg"
                    placeholder="Enter Message"
                    name="message"
                    value={paymentform.message}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="text"
                    className="bg-gray-700 w-full p-2 my-1 rounded-lg"
                    placeholder="Enter Amount"
                    name="amount"
                    value={paymentform.amount}
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    className="text-white w-full bg-purple-500 py-4 px-6 rounded-2xl font-bold my-2"
                    onClick={(e) => {
                     // console.log(paymentform);
                      handleSubmit(e);
                    }}
                  >
                    Pay
                  </button>
                </form>
                <button
                  className="bg-gray-700 py-4 px-6 m-1 rounded-2xl"
                  onClick={() => payNow(10)}
                >
                  Pay ₹10
                </button>
                <button
                  className="bg-gray-700 py-4 px-6 m-1 rounded-2xl"
                  onClick={() => payNow(20)}
                >
                  Pay ₹20
                </button>
                <button
                  className="bg-gray-700 py-4 px-6 m-1 rounded-2xl"
                  onClick={() => payNow(30)}
                >
                  Pay ₹30
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPage;
