'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card, CardContent } from "../ui/card"
import { useEffect, useState } from "react"
import { type CarouselApi } from "@/components/ui/carousel"

const GetStarted = () => {

    const imagesData = [
        { imageUrl: '/landing/linkedforge1.png', text: 'Create a free account' },
        { imageUrl: '/landing/linked2.png', text: 'Click here to create your first assistant' },
        { imageUrl: '/landing/linked3.png', text: 'Give instructions to you assistant' },
        { imageUrl: '/landing/linked4.png', text: 'Click here to get your secret code' },
        { imageUrl: '/landing/linked5.5.png', text: 'Use your new assistant in your website' },
      ];

      const [api, setApi] = useState<CarouselApi>()
      const [current, setCurrent] = useState(0)
      const [count, setCount] = useState(0)
     
      useEffect(() => {
        if (!api) {
          return
        }
     
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
     
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
        })
      }, [api])
      

  return (
    <>
    <h1  className="text-4xl font-bold mt-20">
        How To Get <span className="text-indigo-500">Started?</span> 
    </h1>
    <Carousel className="w-full max-w-xl" setApi={setApi}>
      <CarouselContent>
      {imagesData.map((data, index) => (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
           <CardContent className="flex flex-col items-center justify-center p-6">
              {/* Text */}
              <span className="text-xl font-semibold">{data.text}</span>
              {/* Image */}
              <Image src={data.imageUrl} alt={`Image ${index + 1}`} width={500} height={500} className="object-cover my-4 h-[220px] w-full" />
            </CardContent>
          </Card>
         </div>
  </CarouselItem>
))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        Step {current} of {count}
      </div>
  </>
  )
}

export default GetStarted