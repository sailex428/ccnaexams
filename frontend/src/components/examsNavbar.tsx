import React, { PropsWithChildren } from "react";
import styles from "../../styles/components/navbar.module.scss";
import { PROPERTIES } from "@/src/components/lib/static";
import { useProperties } from "@/src/components/hooks/useProperties";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

const {
  NAVBAR: { NAVBAR_LINK_HOME, NAVBAR_LINK_EXAM },
} = PROPERTIES;

const ExamsNavbar = (props: PropsWithChildren) => {
  const [navbarHome, navbarExam] = useProperties([
    NAVBAR_LINK_HOME,
    NAVBAR_LINK_EXAM,
  ]);
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div className={styles.navLinkWrapper}>
          <a className={clsx(styles.navLink, "defaultText")} href={"/"}>
            <FontAwesomeIcon icon={faDesktop} className={styles.navIcon} />
            {navbarHome}
          </a>
        </div>
        <div className={styles.navLinkWrapper}>
          <a className={clsx(styles.navLink, "defaultText")} href={"/"}>
            {navbarExam}
          </a>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default ExamsNavbar;
