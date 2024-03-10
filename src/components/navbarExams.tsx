import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import styles from "../../styles/navbar.module.css";
import { PropsWithChildren } from "react";
import Image from "next/image";

export default function NavbarExams(props: PropsWithChildren) {
  return (
    <div>
      <Navbar className={styles.navigationBar}>
        <Container>
          <NavbarBrand href={"/"} className={styles.text}>
            <Image
              src="/logo-high.png"
              alt="Logo"
              className={styles.logo}
              height={30}
              width={30}
            />
            {"CCNAExams"}
          </NavbarBrand>
          <Nav>
            <NavLink href={"/11-13"} className={styles.text}>
              {"Module 11-13"}
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
}
