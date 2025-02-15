import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { setRecordSchema, SetRecordType } from "@/lib/schema/SetSchema";
import { fetchAction, postAction } from "@/lib/data/standard";
import { useRouter } from "next/navigation";

type SetDialogueProps = {
  questionId: number,
  session: RequestCookie,
  setId?: string
}

export default function SetDialogue({setId, questionId, session }: SetDialogueProps) {
  const [sets, setSets] = useState<SetRecordType[]>([]); 
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fetchSets = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const data = await fetchAction(
      setRecordSchema.array(), 
      `collection/list/user?questionId=${questionId}`,
      session
    );
    if (data) {
      setSets(data);
    }
  }

  const postQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const sets = Object.keys(selected).filter(key => selected[key]);
    if (sets.length === 0) return;

    setLoading(true);
    const response = await postAction(
      `collection/question?questionId=${questionId}`,
      session,
      {sets: sets}
    );

    console.log(response);
    setLoading(false);
    setOpen(false);
  }

  const handleSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: checked,
    })); 
  }

  const deleteQuestion = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingA(true);
    await postAction(
      `collection/question/delete?questionId=${questionId}&setId=${setId}`,
      session,
      {sets: sets}
    );

    setLoadingA(false);
    router.refresh();
     
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel> 
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              onClick={fetchSets}
              className="text-sm px-2 py-2 focus:bg-neutral-100 focus:text-neutral-900 hover:bg-gray-100 rounded-md"
            >
              Add Question to Set 
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-y-1"
              onClick={e => e.stopPropagation()}
            >
              <DialogHeader>
                <DialogTitle>Add Question To Set</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Tick the box to add question to set
              </DialogDescription>
              <form onSubmit={postQuestion}>
                <div className="flex flex-col mt-4">
                  {sets.map((item, key) => (
                    <div key={key} className="flex items-center gap-x-3">
                      <input
                        className="focus:ring-transparent text-aqua rounded-sm w-4 h-4 border border-murky"
                        type="checkbox"
                        name={item.id}
                        onChange={handleSelected}
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <div>
                    <button
                      className={`w-fit h-fit text-white text-center px-4 py-2 rounded-md text-sm ${loading ? "bg-soft-aqua" : "hover:bg-soft-aqua bg-aqua "}`}
                      type="submit"
                      disabled={loading}
                    >
                      Add To Set
                    </button>
                  </div>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {setId && (
            <DropdownMenuItem>
              <button 
                className={`text-red-500 w-full h-full text-start ${loadingA ? "cursor-progress" : ""}`}
                onClick={deleteQuestion}
              >
                Delete 
              </button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
