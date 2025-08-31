"use client"
import React from 'react'
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton, AppleLoginButton, LinkedInLoginButton, XLoginButton } from "react-social-login-buttons";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';

const Page = () => {
    const { data: session, status } = useSession();
    if(session){
      redirect("/");
    }
  return (
      <div className='my-30'>
        <h2 className='text-2xl font-bold text-neutral-100 my-6 mx-auto text-center'>Login to get your fans to support you</h2>
        <div className='w-80 mx-auto'>
          <FacebookLoginButton onClick={() => console.log("Facebook login not implemented yet.")} />
          <GoogleLoginButton onClick={() => console.log("Google login not implemented yet.")} />
          <XLoginButton onClick={() => console.log("X login not implemented yet.")} />
          <LinkedInLoginButton onClick={() => console.log("LinkedIn login not implemented yet.")} />
          <GithubLoginButton onClick={() => {session ? console.log("signed In already.") : signIn("github", { callbackUrl: "/" })}}/>
          <AppleLoginButton onClick={() => console.log("Apple login not implemented yet.")} />
        </div>
      </div>
  );
};

export default Page