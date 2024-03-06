import { Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import styles from "../../styles/navbar.module.css";

export default function NavbarExams() {
  return (
    <Navbar className={styles.navigationBar}>
      <Container>
        <NavbarBrand href={"/"} className={styles.text}>
          <img src="/logo.png" alt="Logo" />
          {"CCNAExams"}
        </NavbarBrand>
        <Nav>
          <NavLink href={"/11-13"} className={styles.text}>
            {"Module 11-13"}
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
