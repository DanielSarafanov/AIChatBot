import Image from "next/image";
import Header from "../../components/Header";
import { AuthProvider, useAuth } from "../../context/AuthContext";

export default function Home() {

  return (


      <div className="bg-[#080b21] h-screen">
        
        {/* Header component, points users to login/sign up */}
        <Header />

        {/* Going to have a home page component with probably a logo, a descritpion and a get started component*/}

      </div>


  );
}
