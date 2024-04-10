import LandingPage from "@/components/Home";
import Navbar from "@/components/Navbar";
import { getAllOrgs } from "@/prisma/getOrgs";

export default async function Home(){
  const allOrgs = await getAllOrgs();
  return (
    <div>
        <Navbar/>
        <div className="flex justify-center">
        <LandingPage allOrgs={allOrgs}/>
        </div>
    </div>
  );
}
