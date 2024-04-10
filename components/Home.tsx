"use client"
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useGlobalContext } from "@/components/context/page";

interface Org{ 
  id: number; 
  name: string; 
  description: string; 
  img: string; 
  link: string; 
  weblink: string | null; 
  ContributorGuidance: string | null; 
  IdeasList: string | null; 
  category: string | null; 
  year: number[]; 
  Technologies: string[]; 
  Topics: string[]; }

export default function LandingPage({allOrgs}:{allOrgs: Org[]}) {
  const { search,selectedYear ,selectedTech , selectedTopic, selectedCategory, setNumofOrgs} = useGlobalContext();
  const [filteredItems, setFilteredItems] = useState(allOrgs);
  
  const filterItems = () => {
    let filtered = allOrgs;
    
    if (selectedYear.length > 0) {
      filtered = filtered.filter((item) => selectedYear.every(year => item.year.includes(year)));
    }
    
    if (selectedTech.length > 0) {
      filtered = filtered.filter((item) => selectedTech.every(tech => item.Technologies.includes(tech)));
    }

    if (selectedTopic.length > 0) {
      filtered = filtered.filter((item) => selectedTopic.every(topic => item.Topics.includes(topic)));
    }
    if (selectedCategory.length > 0) {
      filtered = filtered.filter((item) => selectedCategory.includes(item.category || ''));
    }
    if (search) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredItems(filtered);
  };

  useEffect(() => {
    filterItems();
  }, [search, selectedYear, selectedTech, selectedTopic, selectedCategory]);
  setNumofOrgs(filteredItems.length);
  return (
    <BentoGrid className="">
      {filteredItems.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.name}
          description={item.description}
          img={item.img}
          year={item.year}
          technologies={item.Technologies}
          category={item.category}
        />
      ))}
    </BentoGrid>
  );
  

}