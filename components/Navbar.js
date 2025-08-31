"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdownInformation");
    if (dropdown) dropdown.classList.toggle("hidden");
  };

  const closeDropdown = () => {
    const dropdown = document.getElementById("dropdownInformation");
    if (dropdown && !dropdown.classList.contains("hidden")) {
      dropdown.classList.add("hidden");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-black/25">
      <span className="text-2xl font-bold text-neutral-100">
        <span className="flex items-end gap-2">
          <Image
            src="https://media.tenor.com/fK_mqBr8xGIAAAAi/coffee-lover.gif"
            alt="Chai gif"
            width={40}
            height={40}
            className="h-10 w-10 mb-1"
          />
          Get Me a Chai!
        </span>
      </span>

      <ul className="flex items-center my-2 gap-4 text-neutral-100">
        {session ? (
          <div className="relative">
            <button
              id="dropdownInformationButton"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={toggleDropdown}
            >
              Welcome{" " + (session.user?.email || "User")}
              <svg
                className="w-2.5 h-2.5 ml-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownInformation"
              className="hidden absolute top-full mt-2 right-0 z-10 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    href="/"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user?.username}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={closeDropdown}
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={() => {
                    closeDropdown();
                    signOut();
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-eg-btn-4 uf-border">
            <Link href="/login">
              <button className="button button-10">Log In</button>
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
