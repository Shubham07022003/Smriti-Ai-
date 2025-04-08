// things to do here:
// first: the number input should accept the numbers (10 total) only and should contain the country code as well.
// age should be visible in number
// second prettify the ui




'use client'
import { backendURI } from "@/app/backendURL";
import { useUser } from "@clerk/nextjs";
import { FormEvent, ReactNode, useState } from "react";
import axios from "axios";
export default function AuthGate({ children }:{children:ReactNode}) {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <div>Loading...</div>; //add any loading spinner (vatsal)
  if (!user!.publicMetadata?.onboarded) {

    return <CustomSignup email={user?.primaryEmailAddress?.emailAddress!} userId={user?.id!}/>;
  }

  return children;
}

function CustomSignup({email,userId}:{email:string, userId:string}) {
  const [num,setNum]=useState<number>(+91)
  const [age,setAge]=useState<number>(20)
  const [username,setUsername]=useState<string>("")       
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()
      
      const res=await axios.post(`${backendURI}/signup`,{
        email,
        mobile:num,
        age,
        username
      })
      console.log(res)
      if (res.status===200) {
        const response=await axios.post("/api/update-metadata", {
          userId,
        });
        if (response.status===200) {
          // toast showing that getting things ready. (vatsal)
          window.location.reload();
        }
      }
      
    }
    
    return (
    <div className="flex flex-col items-center justify-center bg-white text-black h-screen w-full">
        <header>Get started with smriti ai</header>
        <section>Seems like you are new here. Just fill out this last form to get started.</section>
        <form className="flex flex-col " onSubmit={(e)=>handleSubmit(e)}>
            <label>
              Username
            </label>
            <input
            type='text'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            />
            <label>
                Mobile No.
            </label>
            <input 
            type='tel'
            value={num}
            onChange={(e)=>setNum(e.target.value as unknown as number)}
            required
            />
            <label>Age</label>
            <input 
            type='range'
            value={age}
            onChange={(e)=>setAge(e.target.value as unknown as number)}
            required
            />
            <button type="submit">Submit</button>
        </form>
    </div>)
}