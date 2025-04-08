'use client'
import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";


export default function AuthGate({ children }:{children:ReactNode}) {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return <div>Loading...</div>;

  if (!user!.publicMetadata?.onboarded) {
    return <CustomSignup user={user}/>;
  }

  return children;
}


function CustomSignup(user: any) {
//     const provider = user.externalAccounts.length > 0
//   ? user.externalAccounts[0].provider
//   : "email";
    // accept user as prop and destructure it to get the email and username. one thing to make sure is first check user.provider
    
    // await user.update({
    //     publicMetadata: {
    //       onboarded: true
    //     }
    //   });
      
    //send the data to the backend and also set the onboarded to true.
    return (
    <div className="flex flex-col items-center bg-white text-black">
        <header>Get started with smriti ai</header>
        <form className="flex flex-col ">
            <label>
                Mobile No.
            </label>
            <input type='tel'/>
            <label>Age</label>
            <input type='range'/>
        </form>
    </div>)
}