import React from "react";
import styles from "./layout.module.scss";
import Header from "../../components/Header/Header";
import { INavbar } from "../../interfaces/navbar";

interface IProps {
  children: any;
  navbar?: INavbar
}

const Layout = ({ children, navbar }: IProps) => {

  return (
    <div className={styles.container}>
      <Header navbar={navbar as INavbar} />
      <main className={styles.main}>{children} </main>
    </div>
  );
};

export default Layout;
