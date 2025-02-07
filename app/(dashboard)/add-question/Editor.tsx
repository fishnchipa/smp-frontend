import { useRef } from "react";
import Toolbar from "./Toolbar";
import { useEdit } from "@/hooks/useEdit";
import { OptionState } from "@/providers/EditProvider";
import ImageSection from "./ImageSection";
import TextSection from "./TextSection";
import InputSection from "./InputSection";



function EditState({
  option,
  divRef,
}: {
  option: OptionState, 
  divRef: React.RefObject<HTMLDivElement | null>,
}) {
  switch(option) {
    case "TEXT":
      return (
        <TextSection divRef={divRef}/>
    )
    case "INPUT": 
      return (
        <InputSection divRef={divRef}/>
    )
    case "IMAGE":
      return (
        <ImageSection />
    )

  }
}


export default function Editor() {
  const divRef = useRef<HTMLDivElement>(null);
  const { option } = useEdit();

  return (
    <>
      <Toolbar divRef={divRef}/>
      <EditState option={ option } divRef={divRef}/>
    </>
  )
}
