import { SetRecordType } from "@/lib/schema/SetSchema";

export default function SetCheckbox({set}: {set: SetRecordType}) {

  return (
    <div className="flex items-center gap-x-3">
      <input
        className="focus:ring-transparent text-aqua rounded-sm w-4 h-4 border border-murky"
        type="checkbox"
      />
      {set.name}
    </div>
  )
}
