"use client";

import Image from "next/image";
import React, { PropsWithChildren, useContext } from "react";
import LanguageContext from "@/src/components/languageContext";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarOffcanvas,
  NavbarToggle,
  NavDropdown,
  NavLink,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from "react-bootstrap";
import styles from "../../styles/components/navbar.module.css";

export default function ExamsNavbar(props: PropsWithChildren) {
  const { setLang, lang } = useContext(LanguageContext);
  const handleLanguageChange = () => {
    if (lang === "de") {
      setLang("en");
    } else {
      setLang("de");
    }
  };
  return (
    <div>
      <Navbar expand={"sm"} className={styles.navigation}>
        <Container className={styles.container} fluid>
          <NavbarBrand href={"/"} className={styles.brand}>
            <Image
              priority={true}
              src="/logo-high.png"
              alt="Logo"
              className={styles.logo}
              height={32}
              width={32}
            />
            {"CCNAExams"}
          </NavbarBrand>
          <NavbarToggle className={styles.toggle} aria-controls={"sm"} />
          <NavbarOffcanvas className={styles.offCanvas} placement="end">
            <OffcanvasHeader closeButton>
              <OffcanvasTitle
                id={`offcanvasNavbarLabel-expand-md`}
                className={`text-white`}
              >
                CCNAExams
              </OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
              <Nav className={`justify-content-end flex-grow-1 pe-3`}>
                <NavLink href={"/11-13"} className={styles.link}>
                  {"Module 11-13"}
                </NavLink>
                <NavDropdown
                  title="Languages"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                  className={"text-white"}
                >
                  <NavDropdown.Item
                    className={styles.dropdownItem}
                    onClick={() => handleLanguageChange}
                  >
                    English
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className={styles.dropdownItem}
                    onClick={() => handleLanguageChange()}
                  >
                    German
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
}
