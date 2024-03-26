import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import NavItems from "./NavItems";

const Navbar = () => {
  const user = null;
  return (
    <div className="z-50 bg-[#141414] text-white top-0 inset-x-0 h-16">
      <header className="relative">
        <div className="shadow-sm">
          <div className="flex-grow flex-1">
            <div className="mx-auto w-full max-w-screen-2xl px-2.5 md:px-20">
              <div className="flex h-16 items-center">
                {/* Mobile */}

                <div className="ml-4 flex lg:ml-0">
                  <Link href={"/"} className="font-bold">
                    {/* <Image
                      src={"/logo-white.png"}
                      alt="logo"
                      width={100}
                      height={100}
                      loading="lazy"
                    /> */}
                    Digital Odyssey
                  </Link>
                </div>

                <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                  {/* <NavItems /> */}
                </div>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {user ? null : (
                      <Link
                        href={"/register"}
                        className={buttonVariants({
                          className: "text-white bg-yellow-500",
                        })}
                      >
                        Buat Akun
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
