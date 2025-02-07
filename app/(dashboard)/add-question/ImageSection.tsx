import { useEdit } from "@/hooks/useEdit";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ImageSection() {
  const { setContent } = useEdit();
  const [image, setImage] = useState<string | null>(null);
  const [fileData, setFileData] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

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

      setContent(prev => ([...prev, {
        type: "IMAGE",
        value: {
          src: image,
          alt: "image question",
          file: fileData,
          height: !!height ? height : undefined,
          width: !!width ? width : undefined
        }
      }]));
    }
    setFileData(null);
    setImage("");
  }

  const activeUpload = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    const copyImage = (e: ClipboardEvent) => {

      if (e.clipboardData) {
        if (e.clipboardData.files[0]) {
          const objectUrl = URL.createObjectURL(e.clipboardData.files[0]);
          setImage(objectUrl)
          setFileData(e.clipboardData.files[0]);
        }
      }
    }

    window.addEventListener("paste", copyImage);

    return () => {
      window.removeEventListener("paste", copyImage);
    }
  }, [])

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <>
      <span>Image</span>
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
            onChange={(e) => setWidth(parseInt(e.currentTarget.value))}
          />
        </label>
        <label className="flex flex-col">
          Height 
          <input 
            className="h-9 border border-[#e5e7eb] text-sm"
            value={height}
            onChange={(e) => setHeight(parseInt(e.currentTarget.value))}
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

