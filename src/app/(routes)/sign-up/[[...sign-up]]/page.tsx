"use client";
import Auth from "@/components/auth";
import { Dialog } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  }, []);
  return (
    <main>
      <Dialog open={isOpen}>
        <Auth />
      </Dialog>
    </main>
  );
}
