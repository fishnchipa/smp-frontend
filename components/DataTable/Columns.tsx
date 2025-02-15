"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { QuestionType } from "@/lib/schema/QuestionSchema"
import Difficulty from "../Difficulty"
import { moduleParse } from "@/lib/utils"
import { SubmissionType } from "@/lib/schema/SubmissionSchema"
import { SetRecordType } from "@/lib/schema/SetSchema"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import SetDialogue from "../SetDialogue"
import QuestionLink from "../QuestionLink"

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

export const questionPlaceholder: ColumnDef<QuestionType>[] = [
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
  {
    accessorKey: "module",
    header: "Module",
  }
]

export const questionColumns = (
  src: string,
  session?: RequestCookie, 
  set?: string, 
): ColumnDef<QuestionType>[] => [
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => (
      <QuestionLink id={row.original.id} title={row.original.title} href={src}/>
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
    cell: ({ row }) => {
      if (!session) { return null }

      return (
        <SetDialogue setId={set} session={session} questionId={row.original.id} />
      )
    }
  }
]


export const setColumns: ColumnDef<SetRecordType>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({row}) => (
      <Link
        href={`/set/${row.original.id}`}
        className="text-blue-500 hover:underline"
      >
        {row.original.id}
      </Link>
    )
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({row}) => (
      <Link
        href={`/set/${row.original.id}`}
        className="hover:underline"
      >
        {row.original.name}
      </Link>
    )
  },
  {
    accessorKey: "count",
    header: "Total Questions",
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
                <button className="text-red-500 font-bold w-full text-start h-full">Delete</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
