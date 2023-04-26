import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";

export const Layout = ({ children }: { children: JSX.Element }) => (
  <div>
    <Header />
    <main className={styles.pageContent}>{children}</main>
    <Footer/>
  </div>
);
