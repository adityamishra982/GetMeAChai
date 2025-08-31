"use server";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { notFound } from "next/navigation";

export async function initiate(orderId, Amount, to_user, paymentform) {
  await connectDB();
  await Payment.create({
    oid: orderId,
    amount: Number(Amount),
    to_user: to_user,
    name: paymentform.name,
    message: paymentform.message,
  });
}

export async function confirmPayment(orderId) {
  await connectDB();
  await Payment.findOneAndUpdate({ oid: orderId }, { done: true });
}

export async function isUser(to_user) {
  await connectDB();
  let user = await User.findOne({ username: to_user });
  //console.log(`user is ${user}`)
  return JSON.parse(JSON.stringify(user));
}

export async function fetchPayments(username) {
  await connectDB();
  let p = await Payment.find({ to_user: username, done: true })
    .limit(10)
    .lean();
  //console.log(username);
  let payments = JSON.parse(JSON.stringify(p));
  //console.log(payments)
  return payments;
}

export async function fetchUser(Username) {
  await connectDB();
  let u = await User.find({ username: Username }).lean();
  let user = JSON.parse(JSON.stringify(u));
  console.log("user is");
  console.log(user[0]);
  return user[0];
}

async function isValidImageUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' }); // HEAD for performance
    const contentType = response.headers.get('content-type');
    return response.ok && contentType && contentType.startsWith('image/');
  } catch (err) {
    return false;
  }
}

export async function updateUser(userEmail, credentialsForm) {
  await connectDB();
  if(!isValidImageUrl(credentialsForm.profilepic) | credentialsForm.profilepic == "") credentialsForm.profilepic = "https://imgs.search.brave.com/h8F4iiVN8U8zKwpgk8JznRMNcCZrXMICVmWU1vJLrkg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/NDEyLzcyNy9zbWFs/bC91c2VyLWF2YXRh/ci1pbGx1c3RyYXRp/b24tdmVjdG9yLmpw/Zw"
  if(!isValidImageUrl(credentialsForm.coverpic) | credentialsForm.coverpic == "") credentialsForm.coverpic = "https://imgs.search.brave.com/9t6ToEpUpIXcCJ-Liehn1Ay2_GjdKC-qTsstCyQSgFw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9k/YXJrLWdlb21ldHJp/Yy1iYWNrZ3JvdW5k/LXdpdGgtY29weS1z/cGFjZV8yNDk3Mi0x/ODE2LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDA"
  await User.findOneAndUpdate({email: userEmail}, {name: credentialsForm.name, username: credentialsForm.username, profilepic: credentialsForm.profilepic, coverpic: credentialsForm.coverpic, razorpayId: credentialsForm.razorpayId, razorpaySecret: credentialsForm.razorpaySecret})
}
