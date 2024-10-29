"use client"
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Toaster from '../utils/Toaster/toaster';


const SignIn = () => {
    const [userCred, setUserCred] = useState({ email: "", password: "" });
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { data: session, status } = useSession();
    const [passwordType, setPasswordType] = useState("password");
    
    useEffect(() => {
      if (session) {
        router.push('/dashboard');
      }
    }, [session]);
  
    const togglePassword =()=>{
      if(passwordType==="password")
      {
       setPasswordType("text")
       return;
      }
      setPasswordType("password")
    }
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        const res = await signIn("credentials", {
          email: userCred?.email,
          password: userCred?.password,
          redirect: false,
        });
        if (res?.ok) {
          if (session && status === "authenticated") {
            Toaster("success", "LoggedIn Successfully");
            setCookie("access_token", session?.user.accessToken);
            setCookie("refresh_token", session?.user.refreshToken);
          }
          router.push("/dashboard");
        } else {
          Toaster("error", "Invalid Credentials!");
        }
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
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
            <form className="mt-8 space-y-4 flex flex-col" onSubmit={(e) => handleClick(e)}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input onChange={handleChangeInput} name="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter user name" />
               
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input onChange={handleChangeInput} name="password" type={passwordType} required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                  <button
        type="button"
        onClick={togglePassword}
        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-500 transition"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
                     { passwordType==="password"? <FaEyeSlash />:<FaEye />}
                     </button>

                </div>
              </div>

              <div className="!mt-8">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn