import { roles } from "@/config";
import { RoleColumn } from "@/components/role-column";

export default function BestInRole() {
  return (
    <main className="desktop:my-0 desktop:py-4 -my-2 flex w-full max-w-fit space-x-1.5 px-6">
      {roles.map((role) => (
        <RoleColumn role={role} key={role}></RoleColumn>
      ))}
    </main>
  );
}
