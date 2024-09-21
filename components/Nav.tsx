"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "./context/page";
import { categories, Technologies, Topics } from "@/packages/constants/filter";
import { ModeToggle } from "./toggleTheme";
import { Button } from "./ui/button";

export default function Navbar() {
  const categoriesList = [
    {
      name: "Tech",
      options: Technologies,
    },
    {
      name: "Year",
      options: [
        "2024",
        "2023",
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
      ],
    },
    {
      name: "Topic",
      options: Topics,
    },
    {
      name: "Categories",
      options: categories,
    },
  ];

  const {
    setSearch,
    numofOrgs,
    selectedYear,
    setSelectedYear,
    selectedTech,
    setSelectedTech,
    selectedTopic,
    setSelectedTopic,
    selectedCategory,
    setSelectedCategory,
  } = useGlobalContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleTechFilter = (option: string, filterType: string) => {
    switch (filterType) {
      case "Tech":
        handleTechFilterButton({
          language: option,
          selectedFilter: selectedTech,
          setSelectedFilter: setSelectedTech,
        });
        break;
      case "Year":
        handleTechFilterButton({
          language: option,
          selectedFilter: selectedYear,
          setSelectedFilter: setSelectedYear,
        });
        break;
      case "Topic":
        handleTechFilterButton({
          language: option,
          selectedFilter: selectedTopic,
          setSelectedFilter: setSelectedTopic,
        });
        break;
      case "Categories":
        handleTechFilterButton({
          language: option,
          selectedFilter: selectedCategory,
          setSelectedFilter: setSelectedCategory,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = (options: string[]) => {
    return options
      .filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 100);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Menu */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                GSoC Orgs
              </span>
            </div>

            {/* Categories Dropdown */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {categoriesList.map((category) => (
                  <div key={category.name} className="relative">
                    <button
                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === category.name
                            ? null
                            : category.name
                        )
                      }
                    >
                      {category.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === category.name && (
                        <motion.div
                          ref={dropdownRef}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                        >
                          <div className="p-2">
                            <input
                              type="text"
                              placeholder={`Search ${category.name}`}
                              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto space-y-2">
                            {filteredOptions(category.options).map((option) => {
                              // Check if the option is selected
                              const isSelected =
                                (category.name === "Tech" &&
                                  selectedTech.includes(option)) ||
                                (category.name === "Year" &&
                                  selectedYear.includes(option)) ||
                                (category.name === "Topic" &&
                                  selectedTopic.includes(option)) ||
                                (category.name === "Categories" &&
                                  selectedCategory.includes(option));

                              return (
                                <Button
                                  key={option}
                                  variant={"ghost"}
                                  className={`flex w-full justify-start px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                                    isSelected
                                      ? "bg-indigo-500 text-white font-semibold border border-indigo-600 shadow-md"
                                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                  }`}
                                  onClick={() =>
                                    handleTechFilter(option, category.name)
                                  }
                                >
                                  {option}
                                </Button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="Search"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <ModeToggle />
              <div className="ml-3 p-4 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {numofOrgs}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            {/* Mobile Filters */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {categoriesList.map((category) => (
                <div key={category.name} className="relative">
                  <button
                    className="text-gray-700 dark:text-gray-300 block px-3 py-2 rounded-md w-full text-left"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === category.name ? null : category.name
                      )
                    }
                  >
                    {category.name}
                    <ChevronDown className="ml-1 h-4 w-4 inline" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                      >
                        <div className="p-2">
                          <input
                            type="text"
                            placeholder={`Search ${category.name}`}
                            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {filteredOptions(category.options).map((option) => {
                            const isSelected =
                              (category.name === "Tech" &&
                                selectedTech.includes(option)) ||
                              (category.name === "Year" &&
                                selectedYear.includes(option)) ||
                              (category.name === "Topic" &&
                                selectedTopic.includes(option)) ||
                              (category.name === "Categories" &&
                                selectedCategory.includes(option));

                            return (
                              <Button
                                key={option}
                                variant={"ghost"}
                                className={`flex w-full justify-start px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                                  isSelected
                                    ? "bg-indigo-500 text-white font-semibold border border-indigo-600 shadow-md"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                                onClick={() =>
                                  handleTechFilter(option, category.name)
                                }
                              >
                                {option}
                              </Button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Search"
                    type="search"
                  />
                </div>
                <ModeToggle />
                <div className="ml-3 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 p-4 flex items-center justify-center">
                  {numofOrgs}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const handleTechFilterButton = ({
  language,
  selectedFilter,
  setSelectedFilter,
}: {
  language: string;
  selectedFilter: string[];
  setSelectedFilter: any;
}) => {
  if (selectedFilter.includes(language)) {
    setSelectedFilter(selectedFilter.filter((item) => item !== language));
  } else {
    setSelectedFilter([...selectedFilter, language]);
  }
};
