"use client"

import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SolutionToolbar from "./SolutionToolbar";
import { useEdit } from "@/hooks/useEdit";

export default function SolutionImage() {
  const { setSolution } = useEdit();
  const [image, setImage] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      const objectUrl = URL.createObjectURL(file);

      setImage(objectUrl);
      setSolution(prev => [...prev, {type: "IMAGE", value: {
        file: file,
        alt: "image solution"
      }}])

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const activeUpload = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <>
      <SolutionToolbar />
      <div 
        className="relative w-full cursor-pointer h-96 border"
        onClick={activeUpload}
        onMouseEnter={() => setUploadState(true)}
        onMouseLeave={() => setUploadState(false)}
        role="button"
        tabIndex={0}
      >
        {uploadState ? (
          <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 flex justify-center items-center">
            <Upload size={40} color="white"/>
          </div>
        ) : (
          <div className="w-full h-full absolute top-0 flex justify-center items-center">
            <Upload size={40} color="black"/>
          </div>
        )} 
        <div className="w-full h-full absolute">
        {image && <Image
            src={image}
            alt="Uploaded image"
            fill
            className="object-cover"
          /> }
        </div>
        <input 
          type="file" 
          accept="image/*"
          onChange={upload} 
          className="hidden absolute w-full h-full"
          ref={inputRef}
        />
      </div>
    </>
  )
}
