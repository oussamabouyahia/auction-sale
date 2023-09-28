"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Third = () => {
  const pathname = usePathname();
  return (
    <>
      <h1>hello hello hello from third component</h1>
    </>
  );
};

export default Third;
