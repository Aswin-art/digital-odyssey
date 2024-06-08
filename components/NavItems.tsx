import Link from "next/link";
import React from "react";

const NavItems = () => {
  return (
    <div className="flex h-full">
      <div className="relative flex items-center justify-center gap-4">
        <Link href={"/"} className="font-semibold text-sm hover:text-blue-600">
          Produk Batik
        </Link>
        <Link href={"/"} className="font-semibold text-sm hover:text-blue-600">
          Desain Batik
        </Link>
        <Link href={"/"} className="font-semibold text-sm hover:text-blue-600">
          Tentang Kami
        </Link>
      </div>
    </div>
  );
};

export default NavItems;
