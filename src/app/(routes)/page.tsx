import { roles } from "@/config";
import { RoleColumn } from "@/components/role-column";

export default function BestInRole() {
  return (
    <main className="-my-2 flex w-full max-w-fit space-x-1.5 px-6 3xl:my-0 3xl:py-4">
      {roles.map((role) => (
        <RoleColumn role={role}></RoleColumn>
      ))}
    </main>
  );
}
