"use client"
import React, { useState } from 'react'
import { Technologies, Topics, categories } from '@/packages/constants/filter'

import { useGlobalContext } from '@/components/context/page'
import { ModeToggle } from './toggleTheme'
import Filter from './Filter'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Link from 'next/link'
import { GithubIcon } from './Icons'

const Navbar = () => {
  const [yearList, setYearList] = useState([2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]);
  const [technologiesList, setTechnologiesList] = useState(Technologies);
  const [topicsList,setTopicsList] = useState(Topics);
  const [categoriesList,setCategoriesList] = useState(categories);
  const { setSearch, selectedYear, setSelectedYear , selectedTech, setSelectedTech, selectedTopic, setSelectedTopic, selectedCategory, setSelectedCategory, numofOrgs  } = useGlobalContext()

  return (
    <div className='flex flex-col xl:flex-row justify-evenly items-center pr-6 h-20 sticky top-0 z-50 bg-gray-100 dark:bg-slate-900 supports-[backdrop-filter]:bg-gray-100/60 backdrop-blur'>
      <div className='flex flex-col xl:flex-row justify-evenly space-x-6 mr-6 w-full '>
        <Input placeholder="Search..." className='min-w-60 max-w-80 flex flex-1 justify-center items-center border-2 dark:border-gray-500 border-gray-300 bg-inherit ml-3' type="search" onChange={(e)=>(setSearch(e.target.value))} />
        {/* DropdownMenu for technologies */}
        <Filter filterList={technologiesList} setfilterList={setTechnologiesList} selectedFilter={selectedTech} setSelectedFilter={setSelectedTech} Type='Tech'/>
        {/* DropdownMenu for years */}
        <Filter filterList={yearList} setfilterList={setYearList} selectedFilter={selectedYear} setSelectedFilter={setSelectedYear} Type='Year'/>
        {/* DropdownMenu for topics */}
        <Filter filterList={topicsList} setfilterList={setTopicsList} selectedFilter={selectedTopic} setSelectedFilter={setSelectedTopic} Type='Topic'/>
        {/* DropdownMenu for categories */}
        <Filter filterList={categoriesList} setfilterList={setCategoriesList} selectedFilter={selectedCategory} setSelectedFilter={setSelectedCategory} Type='Categories'/>
      </div>
      <div className='flex justify-center'>
        <ModeToggle/>
        <Button className='mx-2 bg-inherit border-gray-300' variant="outline">
          { numofOrgs }
        </Button>
        <Link href={'https://github.com/ShubhamMewara/GSoC_Orgs'} target='_blank'>
          <Button className='mx-2 bg-inherit border-gray-300' variant="outline">
          <GithubIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar