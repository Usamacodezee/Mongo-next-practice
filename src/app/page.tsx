import { NextRequest } from "next/server";
import LoginPage from "./login/page";

const HomePage: React.FC<NextRequest> = (props) => {
  const { cookies, geo, ip, nextUrl, ...otherProps } = props;

  return <LoginPage />;
};

export default HomePage;
