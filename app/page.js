"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex mx-6 md:[mx-0] flex-col">
        <div className="border-b-2 border-neutral-400 flex-col text-center items-center justify-center py-16 text-neutral-100">
          <h1 className="text-4xl font-bold flex justify-center items-center gap-4">
            Get Me a Chai!{" "}
            <Image
              src="https://media.tenor.com/fK_mqBr8xGIAAAAi/coffee-lover.gif"
              alt="chai gif"
              width={10}
              height={10}
              className="h-12 mb-2"
            />
          </h1>
          <p className="my-4">
            A crowd funding platform for creators to fund their projects
          </p>
          <p className="my-4">
            A place where your fans can buy you a Chai. Unleash the power of
            your fans and get your projects funded.
          </p>
          <div className="flex justify-center items-center gap-4">
            <span className="flex justify-center">
              {!session && (
                <div className="container-eg-btn-4 uf-border">
                  <Link className="button button-10" href={"/login"}>
                    Start Here
                  </Link>
                </div>
              )}
              <div className="container-eg-btn-4 uf-border">
                <Link className="button button-10" href={"/about"}>
                  Read More
                </Link>
              </div>
            </span>
          </div>
        </div>
        <div className="py-16">
          <h1 className="text-4xl font-bold flex justify-center items-center gap-4 text-neutral-100">
            Your Fans can buy you a Chai
          </h1>
          <div className="flex justify-around my-10 gap-4">
            <div className="flex-col items-center text-center">
              <div>
                <Image
                  src="https://media.tenor.com/XeC4yf26vlQAAAAi/work-working-from-home.gif"
                  className="h-30 w-30 mx-auto"
                  alt="gif"
                  width={128}
                  height={128}
                />
              </div>
              <h1 className="text-neutral-100 font-bold text-xl my-2">
                Fans want to help
              </h1>
              <p className="text-neutral-100">
                Fans are availaible to support you
              </p>
            </div>
            <div className="flex-col items-center text-center">
              <div>
                <Image
                  src="https://cdnl.iconscout.com/lottie/premium/thumb/dollar-coin-9293607-7594203.gif"
                  className="h-30 w-30 mx-auto"
                  alt="gif"
                  width={128}
                  height={128}
                />
              </div>
              <h1 className="text-neutral-100 font-bold text-xl my-2">
                Fans want to contribute
              </h1>
              <p className="text-neutral-100">
                Your fans are willing to contribute financially
              </p>
            </div>
            <div className="flex-col items-center text-center">
              <div>
                <Image
                  src="https://www.arrowheadgrp.com/wp-content/uploads/2020/12/WorkFromHome.gif"
                  className="h-30 w-30 mx-auto"
                  alt="gif"
                  width={128}
                  height={128}
                />
              </div>
              <h1 className="text-neutral-100 font-bold text-xl my-2">
                Fans want to collaborate
              </h1>
              <p className="text-neutral-100">
                Your fans are ready to collaborate with you
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;