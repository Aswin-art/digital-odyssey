import BreadCrumb from "@/components/dashboard/Breadcumb";
import { columnGame } from "@/components/dashboard/tables/Columns";
import { Heading } from "@/components/dashboard/tables/Heading";
import { DataTable } from "@/components/dashboard/tables/Table";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Game } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const breadcrumbItems = [{ title: "Games", link: "/dashboard/games" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const game = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `/api/games?offset=${offset}&limit=${pageLimit}` +
      (game ? `&search=${game}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const gameRes = await res.json();
  const totalGames = gameRes.data.length;
  const pageCount = Math.ceil(totalGames / pageLimit);
  const gameData: Game[] = gameRes.data;
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Toaster />
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Games (${totalGames})`}
          description="Disini anda bisa bebas mengelola game yang berhasil dibuat."
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
        searchKey="title"
        pageNo={page}
        columns={columnGame}
        totalUsers={totalGames}
        data={gameData}
        pageCount={pageCount}
      />
    </div>
  );
}
