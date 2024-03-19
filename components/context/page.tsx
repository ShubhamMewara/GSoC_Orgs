'use client'
import { createContext, useContext, useState } from "react"


const Context = createContext<{
    search: string;
    setSearch: (search: string) => void;
    selectedYear: Array<number>;
    setSelectedYear: (selected: Array<number>) => void;
    selectedTech: Array<string>;
    setSelectedTech: (selectedFilter: Array<string>) => void;
    selectedTopic: Array<string>;
    setSelectedTopic: (selectedFilter: Array<string>) => void;
    selectedCategory: Array<string>;
    setSelectedCategory: (selectedFilter: Array<string>) => void;
    numofOrgs: number;
    setNumofOrgs: (numofOrgs: number) => void;}>
    ({
    search: "",
    setSearch: () => "",
    selectedYear: [],
    setSelectedYear: () => [],
    selectedTech: [],
    setSelectedTech: () => [],
    selectedTopic: [],
    setSelectedTopic: () => [],
    selectedCategory: [],
    setSelectedCategory: () => [],
    numofOrgs: 0,
    setNumofOrgs: () => 0,});


    export const NavbarContextProvider = ({ children }: any) => {
    const [search, setSearch] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<Array<number>>([]);
    const [selectedTech, setSelectedTech] = useState<string[]>([])
    const [selectedTopic, setSelectedTopic] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string[]>([])
    const [numofOrgs,setNumofOrgs] = useState<number>(0);
    return (
        <Context.Provider value={{search, setSearch, selectedYear, setSelectedYear ,selectedTech ,setSelectedTech,numofOrgs, selectedTopic, setSelectedTopic, selectedCategory, setSelectedCategory, setNumofOrgs }}>
            {children}
        </Context.Provider>
    );
};
export const useGlobalContext = () => useContext(Context);
  