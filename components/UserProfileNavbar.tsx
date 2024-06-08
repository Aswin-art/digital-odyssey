"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfileNavbar() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          {session?.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-transparent text-white">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          <Link href={"/leaderboard"}>Leaderboard</Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <Link href={"/history"}>Riwayat</Link>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
