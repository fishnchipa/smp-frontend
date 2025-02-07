"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import Link from "next/link"
import { QuestionType } from "@/lib/schema/QuestionSchema"
import Difficulty from "../Difficulty"
import { moduleParse } from "@/lib/utils"
import { SubmissionType } from "@/lib/schema/SubmissionSchema"

export const historyColumns: ColumnDef<SubmissionType>[] = [
  {
    accessorKey: "id",
    header: "No.",
    cell: ({row}) => (
      <span>{row.original.question.id}</span>
    )
  
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => (
      <Link
        href={`/question/${row.original.question.id}`}
      >
        {row.original.question.title}
      </Link>
    )
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => (
      <Difficulty status={row.original.question.difficulty}/>
    )
  },
]

export const questionColumns: ColumnDef<QuestionType>[] = [
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => (
      <Link
        href={`/question/${row.original.id}`}
        className="hover:underline"
      >
        {row.original.title}
      </Link>
    )
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => (
      <Difficulty status={row.original.difficulty}/> 
    )
  },
  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => (
      <span>{moduleParse(row.original.module)}</span> 
    )
  },
  {
    id: "actions",
    cell: () => {

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel> 
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger 
                    onClick={e => e.stopPropagation()}

                  >
                    Add Question to Set 
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]"
                    onClick={e => e.stopPropagation()}
                  >
                    <DialogHeader>
                      <DialogTitle>Add Question To Set</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      hi
                    </div>
                    <DialogFooter>
                      
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }

 
]
