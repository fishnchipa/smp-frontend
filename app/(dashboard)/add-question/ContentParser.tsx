import { useEdit } from "@/hooks/useEdit"
import Image from "next/image";

export default function ContentParser() {
  const {content} = useEdit();

  return (
    <div className="flex flex-col gap-y-10 mb-10">
      {content.map((item, index) => {
      switch (item.type) {
          case "SECTION":
            return (
              <div 
                className="w-full" key={index}
                dangerouslySetInnerHTML={{__html: item.value}}
              >
              </div> 
          )

          case "IMAGE":
            return (
              <div key={index}>
              {(item.value.width || item.value.height) ? (
                <div className="flex items-center justify-center">
                  <Image
                    src={item.value.src} 
                    alt={item.value.alt}
                    width={item.value.width}
                    height={item.value.height}
                  />
                </div>
              ) : (
                <div className="aspect-video relative w-full">
                  <Image
                    src={item.value.src} 
                    alt={item.value.alt}
                    fill
                  />
                </div>
              )} 
              </div> 
          )

          case "LIST":

            return (
              <div className="h-10 w-full bg-light-smokey" key={index}>
                List 
              </div> 
          )
            
          case "RESPONSE_FREE":
            return (
              <div
                key={index}
              >
                <div 
                  className="w-full" 
                  dangerouslySetInnerHTML={{__html: item.value.question}}
                >
                </div> 
                <div className="flex items-center gap-x-2 mt-2">
                  Answer: 
                  <div className="flex items-center h-9 w-24 border border-black rounded-md text-sm px-2">
                  </div>
                </div>
              </div>
          )
          case "RESPONSE_MULTIPLE":
            return (
              <div key={index}>
                <div 
                  className="w-full mb-2" 
                  dangerouslySetInnerHTML={{__html: item.value.question}}
                >
                </div> 
                <div className="flex flex-col gap-y-2">
                  {item.value.choice.map((choice, key) => (
                    <div key={key} className="flex gap-x-2 items-center">
                      <input 
                        type="radio" 
                        name={index.toString()} 
                        className="bg-light-aqua checked:bg-aqua focus:ring-0 foucs:bg-red-500 accent-red-100"
                       />

                      <span>{choice}</span>
                    </div>

                  ))}
                </div>
              </div> 
          )
        }
      })}
    </div>
  )

}
