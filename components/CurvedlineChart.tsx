"use client"
import { ResponsiveLine } from "@nivo/line"
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

export default function CurvedlineChart({orgprojects}: {orgprojects: Project[]}) {
  let yearCounts:any = {};

  orgprojects.forEach(item => {
      // Increment the count for each year
      yearCounts[item.year] = (yearCounts[item.year] || 0) + 1;
  });
  
  let data = Object.keys(yearCounts).map(year => ({ x: parseInt(year), y: yearCounts[year] }));
  
    return (
      <div className="w-full h-[300px]">
        <ResponsiveLine
          data={[
            {
              id: "Desktop",
              data: data
            }
          ]}
          margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
          }}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={5}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }