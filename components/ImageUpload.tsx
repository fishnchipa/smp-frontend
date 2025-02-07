import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageUploadProps = {
  onUpload: (src: string, file: File, width?: string, height?: string) => void
}

export default function ImageUpload({onUpload}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState(false);
  const [height, setHeight] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      const objectUrl = URL.createObjectURL(file);

      setFileData(file);
      setImage(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const uploadImage = () => {
    if (image && fileData) {
      onUpload(image, fileData);
    }
    setFileData(null);
    setImage("");
  }

  const activeUpload = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    const copyImage = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
        setFileData(file);
      }
    };

    const div = divRef.current;
    if (div) {
      div.addEventListener("paste", copyImage);
    }

    return () => {
      if (div) {
        div.removeEventListener("paste", copyImage);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <>
      <div 
        className="relative w-full cursor-pointer h-96 border focus:border-aqua"
        onDoubleClick={activeUpload}
        onMouseEnter={() => setUploadState(true)}
        onMouseLeave={() => setUploadState(false)}
        onClick={() => divRef.current?.focus()}
        tabIndex={0}
        ref={divRef}
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
          />}
        </div>
        <input 
          type="file" 
          accept="image/*"
          onChange={upload} 
          className="hidden absolute w-full h-full"
          ref={inputRef}
        />
      </div>
      <div className="flex gap-x-2">
        <label className="flex flex-col">
          Width
          <input 
            className="h-9 border border-[#e5e7eb] text-sm"
            value={width}
            onChange={(e) => {
              const value = e.currentTarget.value;
              const isNumber = Number(e.currentTarget.value);
              setWidth(prev => isNaN(isNumber) ? prev : value);
            }}
          />
        </label>
        <label className="flex flex-col">
          Height 
          <input 
            className="h-9 border border-[#e5e7eb] text-sm"
            value={height}
            onChange={(e) => {
              const value = e.currentTarget.value;
              const isNumber = Number(e.currentTarget.value);
              setHeight(prev => isNaN(isNumber) ? prev : value);
            }}


          />
        </label>
      </div>
      <button 
        className="w-24 group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md text-sm"
        onClick={uploadImage}
      >
        <div className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua justify-center">
          Upload
        </div>
      </button>
    </>
  );
}
