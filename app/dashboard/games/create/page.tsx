import BreadCrumb from "@/components/dashboard/Breadcumb";
import { Heading } from "@/components/dashboard/tables/Heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const breadcrumbItems = [
  { title: "Games", link: "/dashboard/games" },
  { title: "Create", link: "/dashboard/games/create" },
];

const page = () => {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Buat Game Baru`}
            description="Buat game yang sesuai dengan keinginanmu."
          />
        </div>
        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Form Game</CardTitle>
            <CardDescription>Lengkapi form game dibawah.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
