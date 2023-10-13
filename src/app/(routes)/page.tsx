import { roles } from "@/config";
import RoleColumn from "@/components/role-column";
import SideBar from "@/components/side-bar";
//TODO: Lazy load the side bar
/* const SideBar = dynamic(() => import("@/components/side-bar")); */

export default async function BestInRole() {
  return (
    <main className="-my-2 ml-4   flex w-full max-w-fit space-x-1.5 xxl:ml-0 desktop:my-4">
      {/* @ts-expect-error Server Component */}
      <SideBar />
      {roles.map((role) => (
        <RoleColumn role={role} key={role}></RoleColumn>
      ))}
    </main>
  );
}
