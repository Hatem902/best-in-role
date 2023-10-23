import { roles } from "@/config";
import RoleColumn from "@/components/role-column";
import SideBar from "@/components/side-bar";
//TODO: Lazy load the side bar since it's hidden at first render anyways. Currently there's an issue with dynamically importing an async component.
/* const SideBar = dynamic(() => import("@/components/side-bar")); */

export default async function BestInRole() {
  return (
    <>
      <SideBar />
      {/*TODO: Working with scales isn't recommended (currently we're using scales just to gain dev time) -> work with spacings instead for different screens. */}
      <main className="laptop_sm:-mb-[7.75rem] laptop_sm:-ml-[13.5rem] laptop_sm:-mr-[1.4rem] laptop_sm:-mt-[8.65rem] laptop_sm:scale-[.83] -mb-[12.5rem]  -ml-[13.5rem] -mr-[1.4rem]  -mt-[12.5rem] flex w-full max-w-fit scale-[.83] transform-gpu space-x-1.5 laptop:-mb-9 laptop:-ml-20 laptop:-mt-14 laptop:scale-[.93] desktop:mx-0 desktop:my-4 desktop:scale-100 ">
        {roles.map((role) => (
          <RoleColumn role={role} key={role}></RoleColumn>
        ))}
      </main>
    </>
  );
}
