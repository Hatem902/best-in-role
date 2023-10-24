"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles } from "@/config";
import RoleColumn from "./role-column";
import Image from "next/image";

const MobileBestInRole = () => {
  const [currentRole, setCurrentRole] = useState<(typeof roles)[number]>(
    roles[0],
  );
  return (
    <div className="flex w-fit flex-col items-center mobile:hidden">
      <Select
        onValueChange={(value: (typeof roles)[number]) => setCurrentRole(value)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue
            placeholder={
              <div className="flex justify-center self-start">
                <Image
                  src={`/assets/images/roles/${roles[0]}.png`}
                  width={23}
                  height={23}
                  alt={`The best ${roles[0]} pro-players at the League of Legends Worlds 2023, ranked by the number of votes they received.`}
                  className="mr-2"
                />
                {roles[0].toUpperCase()}
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent align="center">
          {roles.map((role) => (
            <SelectItem value={role} key={role}>
              <div className="flex justify-center self-start">
                <Image
                  src={`/assets/images/roles/${role}.png`}
                  width={23}
                  height={23}
                  alt={`The best ${role} pro-players at the League of Legends Worlds 2023, ranked by the number of votes they received.`}
                  className="mr-2"
                />
                {role.toUpperCase()}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <RoleColumn role={currentRole} />
    </div>
  );
};

export default MobileBestInRole;
