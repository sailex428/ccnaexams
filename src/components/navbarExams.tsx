import { PropsWithChildren } from "react";
import Image from "next/image";
import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import styles from "../../styles/navbar.module.css";

export default function NavbarExams(props: PropsWithChildren) {
  return (
    <div>
      <Navbar expand={"lg"} className={styles.navigation}>
        <Container className={styles.container}>
          <NavbarBrand href={"/"} className={styles.brand}>
            <Image
              src="/logo-high.png"
              alt="Logo"
              className={styles.logo}
              height={32}
              width={32}
            />
            {"CCNAExams"}
          </NavbarBrand>
          <Nav>
            <NavLink href={"/11-13"} className={styles.link}>
              {"Module 11-13"}
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
}
