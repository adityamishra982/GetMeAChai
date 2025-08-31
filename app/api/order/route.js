import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const { amount, user_razorpay_id, user_razorpay_secret } = await request.json();
  const razorpay = new Razorpay({
    key_id: user_razorpay_id,
    key_secret: user_razorpay_secret,
  });

  var options = {
    amount: amount,
    currency: "INR",
    receipt: "rcp1",
  };
  const order = await razorpay.orders.create(options);
  console.log(order);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
  //this nextresponse is used to return response just like how in mern we use express and use res for this purpose here we are
  //using this
}
