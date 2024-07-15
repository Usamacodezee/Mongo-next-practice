import { NextRequest } from "next/server";
import LoginPage from "./login/page";

const HomePage: React.FC<NextRequest> = (props) => {
  // eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
  const { cookies, geo, ip, nextUrl, ...otherProps } = props;

  // eslint-disable-next-line react/react-in-jsx-scope
  return <LoginPage />;
};

export default HomePage;
