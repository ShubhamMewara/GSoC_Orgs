"use client"
import { Technologies, Topics, categories } from '@/packages/constants/filter'
import { useState } from 'react';
import Filter from './Filter'
import { useGlobalContext } from './context/page';

const Categories = () => {
const [yearList, setYearList] = useState([2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]);
  const [technologiesList, setTechnologiesList] = useState(Technologies);
  const [topicsList,setTopicsList] = useState(Topics);
  const [categoriesList,setCategoriesList] = useState(categories);
  const { selectedYear, setSelectedYear , selectedTech, setSelectedTech, selectedTopic, setSelectedTopic, selectedCategory, setSelectedCategory } = useGlobalContext()

  return (
    <div className='flex flex-col md:flex-row justify-between mx-8 mb-4 items-center h-auto sticky top-0 z-50 bg-gray-100 dark:bg-slate-900 supports-[backdrop-filter]:bg-gray-100/60 backdrop-blur mt-2 md:mt-0'>
        {/* DropdownMenu for technologies */}
        <Filter filterList={technologiesList} setfilterList={setTechnologiesList} selectedFilter={selectedTech} setSelectedFilter={setSelectedTech} Type='Tech'/>
        {/* DropdownMenu for years */}
        <Filter filterList={yearList} setfilterList={setYearList} selectedFilter={selectedYear} setSelectedFilter={setSelectedYear} Type='Year'/>
        {/* DropdownMenu for topics */}
        <Filter filterList={topicsList} setfilterList={setTopicsList} selectedFilter={selectedTopic} setSelectedFilter={setSelectedTopic} Type='Topic'/>
        {/* DropdownMenu for categories */}
        <Filter filterList={categoriesList} setfilterList={setCategoriesList} selectedFilter={selectedCategory} setSelectedFilter={setSelectedCategory} Type='Categories'/>
      </div>
  )
}

export default Categories