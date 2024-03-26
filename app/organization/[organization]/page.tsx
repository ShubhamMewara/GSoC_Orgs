import { getLinksByName, getOrgsByName, getProjectsByName } from "@/prisma/getOrgs";

import CurvedlineChart from "@/components/CurvedlineChart"

import { LinkIcon, MailIcon, MessageCircleIcon, TwitterIcon } from "@/components/Icons";
import Projects from "@/components/Projects";
import { Button } from "@/components/ui/button"
import Link from "next/link";


export default async function Component({ params }: { params: { organization: string } }) {
  const name = decodeURIComponent(params.organization);
  const orgData = await getOrgsByName(name);
  const orgProjects = await getProjectsByName(name);
  const orgLinks = await getLinksByName(name);
  let graph = (orgData?.year.length || 0) > 1;

  return (
    <div className="grid lg:grid-cols-2 gap-8 p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
        <div className="flex flex-col items-center pb-4">
          <img
            className="mb-2 w-48"
            src={orgData?.img}
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
          <div className="text-gray-600 text-center">
            {orgData?.description}
          </div>
          <Button className="mt-3" variant="secondary">{orgData?.category}</Button>
        </div>
        <div className="grid grid-cols-3 items-center h-14">
          <div className="grid grid-cols-3 col-span-2">
            <Link  href={orgData?.weblink || "#"} target="_blank">
              <Button variant="link" >Visit Site</Button>
            </Link>
            { orgData?.IdeasList && <Link href={orgData?.IdeasList ||"#"} target="_blank">
                <Button variant="link">ideas list</Button>
              </Link>}
            
            { orgData?.ContributorGuidance && <Link href={orgData?.ContributorGuidance || "#"} target="_blank">
              <Button variant="link">Contribution guide</Button>
            </Link>}
          </div>
          <div className="flex space-x-2 justify-center">
            {orgLinks?.map((link,i) => (
              <Link href={link.link} target="_blank" key={i}>
                {link.link.includes('twitter') && <TwitterIcon className="text-blue-400" />}
                {link.link.includes('mailto:') && <MailIcon className="text-red-400" />}
                {link.textContent.includes('chat') && <MessageCircleIcon className="text-orange-400" />}
                {!link.link.includes('twitter') && !link.textContent.includes('mail') && !link.textContent.includes('chat') && <LinkIcon className="text-fuchsia-400"/>}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t-2 py-4">
          <h3 className="text-gray-800 font-semibold mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {orgData?.Technologies.map((tech: string) => (
              <Button className="bg-gray-200 text-gray-700 hover:bg-gray-100" key={tech}>{tech}</Button>
            ))}
          </div>
        </div>
        <div className="border-b py-4 mb-2">
          <h3 className="text-gray-800 font-semibold mb-2">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {orgData?.Topics.map((topic: string) => (
              <Button className=" bg-gray-200 text-gray-700 hover:bg-gray-100" key={topic}>{topic}</Button>
            ))}
        </div>
        </div>
      </div>
        {graph && <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Number of completed Projects</h3>
        <CurvedlineChart orgprojects={orgProjects}/>
      </div>}
      
      <div className={`bg-white rounded-lg shadow-lg p-4   ${graph? 'lg:col-span-2':''}`}>
        <Projects orgprojects={orgProjects} yearlist={orgData?.year}/>
      </div>
    </div>
  )
}
