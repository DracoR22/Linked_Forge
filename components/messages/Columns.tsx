"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import { formatDistance, formatDistanceToNow, subDays } from 'date-fns'
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import useDeleteMessageModal from "@/hooks/use-delete-message-modal"

export type Messages = {
  id?: string | null
  userMessage?: string | null
  assistantMessage?: string | null
  createdAt?: any
}

export const columns: ColumnDef<Messages>[] = [
  {
    accessorKey: "userMessage",
    header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
             Customer Messages
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "assistantMessage",
    header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
             Assistant Answers
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
             Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
      
        // const createdAt = new Date(row.getValue("createdAt")).toLocaleString()
        const createdAt: Date = row.getValue("createdAt");

        const distanceToNow = formatDistanceToNow(createdAt, {includeSeconds: true, addSuffix: true });
  
        return (
          <div>
            {distanceToNow}
          </div>
        )
      }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { id } = row.original
  //     const { onOpen } = useDeleteMessageModal()

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="p-4 focus-visible:ring-indigo-500 focus-visible:ring-offset-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4"/>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end" >
  //           <div onClick={() => onOpen({ messageId: id })}>
  //              <DropdownMenuItem className="cursor-pointer">
  //                <Trash className="h-4 w-4 mr-2"/>
  //                  Delete
  //              </DropdownMenuItem>
  //           </div>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   }
  // }
]
