"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {
  CellAction,
  CellActionGame,
  CellActionGamePlayer,
  CellActionQuestion,
} from "./CellAction";
import { Employee, Game, GamePlayer, Question } from "@/lib/data";

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: "NAME",
  },
  {
    accessorKey: "country",
    header: "COUNTRY",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "job",
    header: "COMPANY",
  },
  {
    accessorKey: "gender",
    header: "GENDER",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export const columnGame: ColumnDef<Game>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "TITLE",
  },
  {
    accessorKey: "gameCode",
    header: "GAME CODE",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "introVideo",
    header: "INTRO VIDEO",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionGame data={row.original} />,
  },
];

export const columnQuestion: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "content",
    header: "QUESTION",
  },
  {
    accessorKey: "createdAt",
    header: "DATE CREATED",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionQuestion data={row.original} />,
  },
];

export const columnGamePlayer: ColumnDef<GamePlayer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "playerName",
    header: "PLAYER NAME",
  },
  {
    accessorKey: "playerNpm",
    header: "PLAYER NPM",
  },
  {
    accessorKey: "totalPoint",
    header: "TOTAL POINT",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionGamePlayer data={row.original} />,
  },
];
