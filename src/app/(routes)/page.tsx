import { roles } from "@/config";
import { RoleColumn } from "@/components/role-column";

export default function BestInRole() {
  return (
    <main className="-my-2 ml-3 flex w-full max-w-fit space-x-1.5 desktop:my-0 desktop:ml-0 desktop:py-4">
      {roles.map((role) => (
        <RoleColumn role={role} key={role}></RoleColumn>
      ))}
    </main>
  );
}
