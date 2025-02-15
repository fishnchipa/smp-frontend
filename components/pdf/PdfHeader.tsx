
type PdfHeader = {
  module: string,
  topic: string
}

export default function PdfHeader ({module, topic}: PdfHeader) {
  return (
    <div className="flex flex-col mt-[64px] text-[16px] w-full">
      <div className="flex justify-end w-full ">
        <div className="flex flex-col mr-[250px] justify-end leading-[24px] ">
          <span>Name:</span>
          <span>Mark:</span>
        </div> 
      </div>
      <div className="flex justify-between w-full mt-[23px] pr-[80px] pl-[65px] text-[16px]">
        <span className="underline">{module}</span>
        <span className="underline">{topic}</span>
      </div>
      <div className="flex justify-center">
        <hr className="mt-[13px] border-black w-[82%]"/>
      </div>
    </div>
  )
}

