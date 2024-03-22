import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 md:auto-rows-[23rem] gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  year,
  technologies,
  category,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  year?: Array<number>;
  technologies?: Array<string>;
  category?: string | null;
}) => {
  return (
    <div
    onClick={()=>{window.open(`/organization/${title}`)}}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-5 dark:bg-gray-700 bg-white justify-around flex flex-col space-y-4 cursor-pointer", 
        className
      )}
    >
      <img className='flex justify-center mx-auto h-1/3  group-hover/bento:translate-x-1 transition duration-200' src={img} alt="img" loading="lazy" />
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        <div className="flex justify-center items-center">
          <Badge variant="outline" className="mb-2">
            {category}
          </Badge>
        </div>
        <div className="font-sans font-bold dark:text-neutral-50 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-700 dark:text-neutral-300 text-xs tracking-tight">
          {description}
        </div>
        <div className="mt-1 py-1">
          {technologies?.map((technologie,i) => (
            <button className="px-1 mr-2 mb-1 rounded-sm bg-gray-200 dark:text-neutral-100 dark:bg-gray-600 text-neutarl-700 text-sm" key={i}>
              {technologie.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="mt-1">
          {year?.map((year,i) => (
            <button className="px-1 pb-0.5 mr-1 mb-1 hover:shadow-xl rounded-md bg-gray-200 text-neutarl-700 dark:text-neutral-100 dark:bg-gray-600 text-sm" key={i}>
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
