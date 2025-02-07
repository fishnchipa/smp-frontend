import { useRef, useState } from "react";
import { searchTags } from "./action";
import { TagType } from "@/lib/schema/QuestionSchema";

type TopicProps = {
  handleTagChange: (tag: TagType) => void
}

export default function Topic({handleTagChange}: TopicProps) {
  const [currentTag, setCurrentTag] = useState<TagType | null>(null);
  const [search, setSearch] = useState("");
  const [searchedTags, setSearchTags] = useState<TagType[]>([]);
  const [error, setError] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setSearch(e.currentTarget.value);
    const query = e.currentTarget.value.replace(/[^a-zA-Z0-9]+/g, "-");
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      if (query.length === 0) {
        setCurrentTag(null);
        setSearchTags([]);
      } else {
        const tags = await searchTags(query);
        setSearchTags(tags);
      }
    }, 300);  
  };

  const handleTag = () => {
    if (currentTag !== null) {
      handleTagChange(currentTag);
    } else {
      setError(true);
    }
    setSearchTags([]);
    setSearch("");
  }

  const activateTag = (e: React.MouseEvent<HTMLButtonElement> ,tag: TagType) => {
    e.persist()
    setSearch(tag.title);
    setCurrentTag(tag);
  }

  return (
    <div className="flex gap-x-3">
      <div className="flex flex-col relative">
        <input 
          className="h-9 text-sm text-black w-full"
          placeholder="Add Topic"
          onBlur={() => setTimeout(() => setSearchTags([]), 100)}
          value={search}
          onFocus={onSearch}
          onChange={onSearch}
        />
        {searchedTags.length !== 0 && <div className="border w-full flex flex-col gap-x-2 text-sm absolute top-9 bg-white">
          {searchedTags.map((item, index) => (
            <button
              onClick={(e) => activateTag(e, item)}
              className="text-left p-2 hover:bg-light-smokey"
              key={index}
            >
              {item.title}
            </button>
          ))} 
        </div>}
        {error && <span className="text-red-500 text-sm">Tag does not exist</span>}
      </div>
      <button 
        className="w-24 group px-3 h-9 border border-aqua hover:border-soft-aqua bg-light-aqua rounded-md text-sm whitespace-nowrap"
        onClick={handleTag}
      >
        <div className="w-full h-full flex items-center gap-x-2 text-aqua group-hover:text-soft-aqua justify-center">
          Add Topic
        </div>
      </button>
    </div>
  )
}


