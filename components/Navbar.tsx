"use client"
import { useGlobalContext } from '@/components/context/page'
import { ModeToggle } from './toggleTheme'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Link from 'next/link'
import { GithubIcon } from './Icons'

const Navbar = () => {
  const { setSearch, numofOrgs  } = useGlobalContext()

  return (
    <div className='flex flex-col md:flex-row justify-between items-center sticky my-3 top-0 z-50 bg-gray-100 dark:bg-slate-900 supports-[backdrop-filter]:bg-gray-100/60 backdrop-blur'>
      <div className='flex flex-col md:flex-row justify-between px-8 w-full'>
        <Input placeholder="Search..." className='min-w-full md:min-w-60 max-w-full md:max-w-80 flex flex-1 justify-center items-center border-2 dark:border-gray-500 border-gray-300 bg-inherit mb-2 mr-3 md:mb-0 ml-3' type="search" onChange={(e)=>(setSearch(e.target.value))} />
        <div className='flex justify-center mt-2 md:mt-0'>
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
    </div>
  )
}

export default Navbar
