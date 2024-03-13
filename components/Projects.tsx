"use client"
import React, { useState } from 'react'
import { Button } from './ui/button';
import Link from 'next/link';
interface Project {
    id: number;
    contributor: string;
    mentor: string | null;
    title: string;
    description: string;
    projectDetails: string;
    codeLink: string;
    year: number;
    organizationName: string;
}
interface CurvedlineChartProps {
    orgprojects: Project[];
    yearlist: number[] | undefined;

}

const Projects = ({orgprojects, yearlist}: CurvedlineChartProps) => {
    yearlist = yearlist?.filter((year: number) => year != 2024);
    const [selectedYear, setSelectedYear] = useState<number>(yearlist ? yearlist[0] : 0);
  return (
    <div>
        <div className="pb-4 mb-2">
            <h3 className="text-gray-800 font-semibold text-center">Projects</h3>
            <div className="flex flex-wrap gap-2 justify-center">
            {yearlist?.map((year: number) => (
                <Button variant={'link'} onClick={()=>(setSelectedYear(year))} className={(year == selectedYear)? 'underline bg-gray-100':''} key={year}>{year}</Button>
            ))}
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
            {orgprojects.map((project: Project, i: number) => ((project.year == selectedYear) &&
            <div className="flex flex-col justify-between m-2 p-2 bg-gray-100 rounded-xl" key={i}>
                <div>
                    <div className="font-bold mb-1">{project.title}</div>
                    <div className="font-semibold mb-1 border-b-2">Contributor : {project.contributor}</div>
                    <div className="font-extralight">{project.description}</div>
                </div>
                <div className='flex justify-between'>
                <Link href={project.codeLink} target='_blank'>
                    <Button variant="link" className="text-blue-500">Code</Button>
                </Link>
                <Link href={project.projectDetails} target='_blank'>
                    <Button variant="link" className="text-blue-500">Project Details</Button>
                </Link>
                </div>
            </div>
            ))}
    </div>
  </div>
  )
}

export default Projects