"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

function VisitBtn({ shareUrlForm }: { shareUrlForm: string }) {
  const [mounted, setMounted] = useState(false);
  const shareLink = `${window.location.origin}/submit/${shareUrlForm}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!setMounted) {
    return null;
  }

  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visitar
    </Button>
  );
}

export default VisitBtn;
