import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer/>
  </>
);
