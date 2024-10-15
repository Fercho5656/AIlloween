import { Tabs as BaseTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Props {
  data: {
    [category: string]: Array<{ title: string, prompt: string, url: string }>
  }
}

export function Tabs({ data }: Props) {
  const categories = Object.keys(data);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  return (
    <BaseTabs defaultValue={categories[0]}>
      <ScrollArea>
        <TabsList className="p-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-2xl">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" className="h-1 bg-gray-200" />
      </ScrollArea>

      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <div className="grid grid-cols-12 gap-8">
            {data[category].map((item, index) => (
              <div
                key={index}
                className={`col-span-3 rounded-sm relative cursor-pointer transition-transform hover:transform hover:scale-105 hover:rotate-2 ${selectedImage === item.title ? 'border-[6px] border-blue-500' : ''}`}
                onClick={() => setSelectedImage(item.title)}>
                <img
                  src={item.url}
                  alt={item.title}
                  title={item.title}
                  className="w-full h-full rounded-sm object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </BaseTabs>
  );
}
