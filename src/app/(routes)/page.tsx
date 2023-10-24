import { roles } from "@/config";
import RoleColumn from "@/components/role-column";
import SideBar from "@/components/side-bar";
import MobileBestInRole from "@/components/mobile-best-in-role";
//TODO: Lazy load the side bar since it's hidden at first render anyways. Currently there's an issue with dynamically importing an async component.
/* const SideBar = dynamic(() => import("@/components/side-bar")); */

export default async function BestInRole() {
  return (
    <>
      <SideBar />
      <MobileBestInRole />
      {/*TODO: Working with scales isn't recommended (currently we're using scales just to gain dev time) -> work with spacings instead for different screens. */}

      <main className="mx-0 mb-2 mt-4 hidden  w-full max-w-fit scale-100 transform-gpu     space-x-1.5 mobile:-mb-[11.3rem]  mobile:-ml-[19.6rem]   mobile:-mr-[4rem] mobile:-mt-[11.3rem] mobile:flex mobile:scale-[.78] laptop_sm:-mb-[8.7rem] laptop_sm:-ml-[13.5rem] laptop_sm:-mr-[1.4rem] laptop_sm:-mt-[8.9rem] laptop_sm:scale-[.83] laptop:-mb-[3.2rem] laptop:-ml-20 laptop:-mt-[3.3rem] laptop:scale-[.93] desktop:mx-0   desktop:mb-2 desktop:mt-4 desktop:scale-100">
        {roles.map((role) => (
          <RoleColumn role={role} key={role} />
        ))}
      </main>
    </>
  );
}
