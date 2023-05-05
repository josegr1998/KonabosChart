import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";
import { store } from "../../redux/store";
import { Provider } from "react-redux";

export const Layout = ({ children }: { children: JSX.Element }) => (
  <div>
    <Provider store={store}>
      <Header />
      <main className={styles.pageContent}>{children}</main>
      <Footer />
    </Provider>
  </div>
);
