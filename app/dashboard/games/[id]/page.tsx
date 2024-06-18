import BreadCrumb from "@/components/dashboard/Breadcumb";
import { columns } from "@/components/dashboard/tables/Columns";
import { Heading } from "@/components/dashboard/tables/Heading";
import { GameTable } from "@/components/dashboard/tables/Table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/lib/data";
import React from "react";

const breadcrumbItems = [
  { title: "Games", link: "/dashboard/games" },
  { title: "Detail", link: "/dashboard/games" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : "")
  );
  const employeeRes = await res.json();
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = [];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`The Chronicle of Canonics`}
            description="Play and challenge yourself."
          />
        </div>
        <Separator />

        <GameTable
          searchKey="question"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={employee}
          pageCount={pageCount}
        />
        <GameTable
          searchKey="player"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={employee}
          pageCount={pageCount}
        />
      </div>
    </ScrollArea>
  );
}
