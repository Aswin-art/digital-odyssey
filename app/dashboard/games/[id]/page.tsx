import BreadCrumb from "@/components/dashboard/Breadcumb";
import {
  columnGamePlayer,
  columnQuestion,
  columns,
} from "@/components/dashboard/tables/Columns";
import { Heading } from "@/components/dashboard/tables/Heading";
import { DataTable } from "@/components/dashboard/tables/Table";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GamePlayer, Question } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const breadcrumbItems = [
  { title: "Games", link: "/dashboard/games" },
  { title: "Detail", link: "/dashboard/games" },
];

type paramsProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams, params }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://digital-odyssey-sable.vercel.app/api/games/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const apiRes = await res.json();
  const totalQuestion = apiRes.data.questions.length;
  const pageQuestionCount = Math.ceil(totalQuestion / pageLimit);
  const question: Question[] = apiRes.data.questions;

  const totalUsers = apiRes.data.gamePlayers.length;
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const gamePlayer: GamePlayer[] = apiRes.data.gamePlayers;
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Daftar Pertanyaan`}
            description="Berikut adalah daftar pertanyaan dari game."
          />
          <Link
            href={"/dashboard/games/create"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <DataTable
          searchKey="content"
          pageNo={page}
          columns={columnQuestion}
          totalUsers={totalQuestion}
          data={question}
          pageCount={pageQuestionCount}
        />

        <div
          className="flex items-start justify-between"
          style={{ marginTop: "5rem !important" }}
        >
          <Heading
            title={`Daftar Pemain`}
            description="Berikut adalah daftar pemain yang bermain."
          />
          <Link
            href={"#"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Export
          </Link>
        </div>
        <Separator />
        <DataTable
          searchKey="name"
          pageNo={page}
          columns={columnGamePlayer}
          totalUsers={totalUsers}
          data={gamePlayer}
          pageCount={pageCount}
        />
      </div>
    </ScrollArea>
  );
}
