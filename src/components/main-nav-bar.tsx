import { UserButton } from "@clerk/nextjs";

const MainNavBar = () => {
  return <UserButton afterSignOutUrl="/" />;
};

export default MainNavBar;
