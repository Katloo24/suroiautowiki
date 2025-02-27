"use client";

import { useState } from "react";
import { Collapse } from "react-collapse";
import InfoxboxHeader from "./InfoboxHeader";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function InfoboxAudioGroup({
  children,
}: InfoboxAudioGroupProps) {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      <div
        onClick={() => setIsOpened(!isOpened)}
        className="cursor-pointer relative"
      >
        <InfoxboxHeader>Sounds</InfoxboxHeader>
        <div className="absolute right-2 top-1/4">
          {isOpened ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <Collapse isOpened={isOpened}>
        <div className="flex flex-col divide-y divide-primary text-sm border-t border-t-primary">
          {children}
        </div>
      </Collapse>
    </>
  );
}

export interface InfoboxAudioGroupProps extends React.PropsWithChildren {}
