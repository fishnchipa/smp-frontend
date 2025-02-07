import Checkbox from "./Checkbox";
import TopicSearch from "./TopicSearch";
import TagParams from "@/app/(dashboard)/question/[questionId]/TagParams";

export default function Filter() {

  return (
    <div className="w-full flex flex-col mt-2 rounded-md bg-white border pb-10">
      <div className="w-full py-2 px-4">
        <h3 className="mb-1 text-lg">Modules</h3>
        <div className="flex flex-col gap-y-2">
          <Checkbox 
            label="Advanced Mechanics"
            filter="modules"
          />
          <Checkbox 
            label="Electromagnetism"
            filter="modules"
          />
          <Checkbox 
            label="The Nature of Light"
            filter="modules"
          />
          <Checkbox 
            label="From the Universe to the Atom"
            filter="modules"
          />
        </div>
      </div>
      <div className="w-full py-2 px-4">
        <h3 className="mb-1 text-lg">Search For Tags</h3>
        <div className="flex flex-col gap-y-2">
          <TagParams />
          <div className="flex gap-x-2 text-sm">
            <TopicSearch />
          </div>
        </div>
      </div>
      <div className="w-full py-2 px-4">
        <h3 className="mb-1 text-lg">Difficulty</h3>
        <div className="flex flex-col gap-y-2">
          <Checkbox 
            label="Easy"
            filter="difficulty"
            className="text-easy"
          />
          <Checkbox 
            label="Medium"
            filter="difficulty"
            className="text-medium"
          />
          <Checkbox 
            label="Hard"
            filter="difficulty"
            className="text-hard"
          />
        </div>
      </div>
    </div>

  )
}
