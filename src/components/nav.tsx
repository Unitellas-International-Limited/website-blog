"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import BaseModal from "./baseModal";
import Image from "next/image";
import Icon from "../../public/assets/images/unitellasicon.png";

export default function Nav() {
  const [sideBarDisplay, setSideBarDisplay] = useState(false);

  const navLinks = [
    {
      title: "home",
      url: "https://www.unitellas.com.ng/",
    },
    {
      title: "solutions",
      url: "https://www.unitellas.com.ng/solutions",
    },
    {
      title: "about",
      url: "https://www.unitellas.com.ng/about",
    },
    {
      title: "training",
      url: "https://www.unitellas.com.ng/training",
    },
    {
      title: "contact",
      url: "https://www.unitellas.com.ng/contact",
    },
  ];

  return (
    <>
      <nav className="md:hidden bg-gray-900/90 flex items-center justify-between px-4 py-1">
        <div className="relative w-18 h-16">
          <Image src={Icon} alt="Unitellas Icon" fill />
        </div>

        <Menu
          className="cursor-pointer ms-auto text-white w-8 h-8 my-3"
          onClick={() => {
            setSideBarDisplay(true);
          }}
        />

        <BaseModal
          close={() => {
            setSideBarDisplay(false);
          }}
          display={sideBarDisplay}
          xPosition="right"
          motionProps={{
            initial: { x: "100%" },
            animate: { x: 0 },
            transition: { type: "tween" },
            // exit: { x: 0, transition: { duration: 1 } },
          }}
        >
          <div className="h-screen w-64 bg-black/70 p-6">
            <X
              className="ml-auto block h-6 cursor-pointer text-white"
              onClick={() => {
                setSideBarDisplay(false);
              }}
            />

            <ul className="mt-4 space-y-6 capitalize text-white">
              {navLinks.map((link) => (
                <li key={link.url}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </BaseModal>
      </nav>

      <nav className="hidden px-4 py-1 md:flex bg-gray-900/90 justify-between items-center">
        <div className="relative w-18 h-16">
          <Image src={Icon} alt="Unitellas Icon" fill />
        </div>

        <ul className="flex h-20 items-center justify-end gap-8 font-medium px-3 py-4 capitalize text-white">
          <li className="mr-auto"></li>
          {navLinks.map((link) => (
            <li key={link.url}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
          <li></li>
        </ul>
      </nav>
    </>
  );
}
