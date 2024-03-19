import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Button } from './ui/button'

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"

interface FilterProps {
    filterList: any
    setfilterList: any
    selectedFilter: any
    setSelectedFilter: any
    Type: String
  
}

const FormSchema = z.object({
    language: z.string({
      required_error: "Please select a language.",
    }),
  })

const Filter = ({filterList, setfilterList, selectedFilter, setSelectedFilter, Type}:FilterProps) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })
      function handleTechFilterButton(language:string){
        if(selectedFilter.includes(language)){
            setSelectedFilter(selectedFilter.filter((item:any) => item !== language))
        }else{
          // Remove the selected year from its current position
          //@ts-ignore
          const filteredList = filterList.filter(item => item !== language);
          // Add the selected year to the beginning of the list
          const updatedList = [language, ...filteredList];
          // Update the state with the new list
          setfilterList(updatedList);
          setSelectedFilter([...selectedFilter, language])
        }
      }
  return (
    <div className='flex justify-center'>
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-56 justify-between bg-inherit dark:border-gray-400 dark:text-gray-400 border-gray-300 text-gray-600"
                      )}
                    >
                      <div className='overflow-hidden'>
                        {(selectedFilter[0])? selectedFilter.join(','): "Select " + Type}
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto max-h-[50vh] p-0">
                  <Command>
                    <CommandInput placeholder={`Search ${Type}...`} />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup className='overflow-y-auto'>
                      <div className={(Type == 'Year')?"":'grid grid-cols-3'}>
                      {filterList.map((language:any,i:any) => (
                        <CommandItem
                          className={ selectedFilter.includes(language)? "bg-gray-100": "" }
                          key={i}
                          onSelect={() => {
                            handleTechFilterButton(language)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedFilter.includes(language)? "opacity-100": "opacity-0"
                            )}
                          />
                          {language}
                        </CommandItem>
                      ))}
                      </div>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    </div>
  )
}

export default Filter