"use client";
import BreadCrumb from "@/components/dashboard/Breadcumb";
import { Heading } from "@/components/dashboard/tables/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createGameSchema } from "@/schemas/index.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const breadcrumbItems = [
  { title: "Games", link: "/dashboard/games" },
  { title: "Create", link: "/dashboard/games/create" },
];

const Page = () => {
  const createForm = useForm<z.infer<typeof createGameSchema>>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      title: "",
      description: "",
      introVideo: "",
    },
  });

  const router = useRouter();

  const handleCreateFormSubmit = async (
    values: z.infer<typeof createGameSchema>
  ) => {
    const loadingToastId = toast.loading("Creating game...");

    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${res.status} ${errorData.message}`);
      }

      toast.success("Game created", { id: loadingToastId });
      router.back();
    } catch (error: any) {
      toast.dismiss(loadingToastId);
      toast.error(`Failed to create game`);
      console.error("Failed to create game:", error.message);
    }
  };

  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Toaster />
      <BreadCrumb items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading
          title={`Buat Game Baru`}
          description="Buat game yang sesuai dengan keinginanmu."
        />
      </div>
      <Separator />

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Form Game</CardTitle>
            <CardDescription>Lengkapi form game dibawah.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(handleCreateFormSubmit)}>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <FormField
                    control={createForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Judul Game</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="false"
                            placeholder="masukkan judul game..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="introVideo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Intro Video</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="false"
                            placeholder="masukkan link video..."
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            disabled={true}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Game</FormLabel>
                        <FormControl>
                          <Textarea
                            autoComplete="false"
                            placeholder="masukkan deskripsi game..."
                            value={field.value ?? ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={false}>
                  Buat Game
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
