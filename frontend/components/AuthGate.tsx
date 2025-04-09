"use client";

import { useEffect, useState, FormEvent, ReactNode } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { backendURI } from "@/app/backendURL";
 import { useUser } from "@clerk/nextjs";
 
 export default function AuthGate({ children }:{children:ReactNode}) {
   const { user, isLoaded } = useUser();
   if (!isLoaded) return <div>Loading...</div>; //add any loading spinner (vatsal)
   if (!user!.publicMetadata?.onboarded) {
    return <CustomSignup email={user?.primaryEmailAddress?.emailAddress!} userId={user?.id!}/>;
  }
  return children
}
function CustomSignup({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const [phone, setPhone] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [defaultCountry, setDefaultCountry] = useState<string>("in");

  // Fetch country code by IP
  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code) {
          setDefaultCountry(data.country_code.toLowerCase());
        }
      })
      .catch(() => {
        setDefaultCountry("in");
      });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numAge = parseInt(age, 10);
    const res = await axios.post(`${backendURI}/signup`, {
      email,
      mobile: `+${phone}`,
      numAge,
      username,
    });

    if (res.status === 200) {
      //set the jwt here in localstorage
      const token=(res.data as { token: string }).token;
      localStorage.setItem("backendtoken",token)
      const response = await axios.post("/api/update-metadata", { userId });
      if (response.status === 200) {
        window.location.reload();
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full px-4">
      <header className="text-2xl font-semibold mb-2">
        Get started with Smriti AI
      </header>
      <section className="text-gray-400 mb-6 text-center max-w-md">
        Seems like you are new here. Just fill out this quick form to get
        started.
      </section>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        {/* Username */}
        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 ring-primary"
          />
        </div>

        {/* Mobile number */}
        <div>
          <label className="block mb-1 text-sm font-medium">Mobile No.</label>
          <PhoneInput
            country={defaultCountry}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            enableSearch
            preferredCountries={["in", "us"]}
            autoFormat
            disableDropdown={false}
            containerClass="!w-full dark-phone-input"
            inputClass="!w-full !bg-zinc-800 !text-white !px-4 !py-2 !rounded-lg !border-none focus:ring-2 focus:ring-primary"
            buttonClass="!bg-zinc-700"
            inputStyle={{ backgroundColor: "#27272a", color: "white" }}
            buttonStyle={{ backgroundColor: "#3f3f46" }}
            placeholder="Enter phone number"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 text-sm font-medium">Age</label>
          <input
            type="number"
            value={age}
            min={10}
            max={100}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white outline-none focus:ring-2 ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-primary text-black font-semibold hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
