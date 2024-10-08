import LandingPage from "@/components/Home";
import Navbar from "@/components/Nav";
import { getAllOrgs } from "@/prisma/getOrgs";

export default async function Home(){
  const allOrgs = await getAllOrgs();
  return (
    <div>
        <Navbar/>
        <div className="flex justify-center mt-6">
        <LandingPage allOrgs={allOrgs}/>
        </div>
    </div>
  );
}
