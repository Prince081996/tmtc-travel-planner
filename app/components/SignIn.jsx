"use client"
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
const SignIn = () => {
    const [userCred, setUserCred] = useState({ email: "", password: "" });
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { data: session, status } = useSession();
    useEffect(() => {
      if (session) {
        router.push('/dashboard');
      }
    }, [session]);
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await signIn("credentials", {
          email: userCred?.email,
          password: userCred?.password,
          redirect: false,
        });
        if (res?.ok) {
        //   Toaster("success", "LoggedIn Successfully");
          if (session && status === "authenticated") {
            setCookie("access_token", session?.user.accessToken);
            setCookie("refresh_token", session?.user.refreshToken);
          }
          console.log(res,"...")
          router.push("/dashboard");
        } else {
        //   Toaster("error", "Invalid Credentials!");
        }
        console.log(res, "res");
        // if (res?.error) {
        //   Toaster("error",res?.error); // Show the error message
        // }
        // router.replace("/dashboard");
      } catch (error) {
        console.log(error, "bvcvbvcbvbvbvbvbv");
      }
    };
  
    const handleChangeInput = (e) => {
      e.preventDefault();
      const { value, name } = e.target;
      setUserCred((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  return (
    <div class="bg-gray-50 font-[sans-serif]">
      <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div class="max-w-md w-full">
          <div class="p-8 rounded-2xl bg-white shadow">
            <h2 class="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form class="mt-8 space-y-4 flex flex-col" onSubmit={(e) => handleClick(e)}>
              <div>
                <label class="text-gray-800 text-sm mb-2 block">email</label>
                <div class="relative flex items-center">
                  <input onChange={handleChangeInput} name="email" type="text" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
               
                </div>
              </div>

              <div>
                <label class="text-gray-800 text-sm mb-2 block">Password</label>
                <div class="relative flex items-center">
                  <input onChange={handleChangeInput} name="password" type="password" required class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              <div class="!mt-8">
                <button type="submit" class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>
              {/* <p class="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="javascript:void(0);" class="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn