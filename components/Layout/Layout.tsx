import { Header } from "../Header/Header";

export const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
