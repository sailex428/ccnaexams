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
import { PROPERTIES } from "@/src/components/lib/static";

export default function ExamsNavbar(props: PropsWithChildren) {
  const { setLang } = useContext(LanguageContext);
  return (
    <div>
      <Navbar expand={"sm"} className={styles.navigation}>
        <Container className={styles.container}>
          <NavbarBrand href={"/"} className={styles.brand}>
            <Image
              priority={true}
              src="/logo-high.png"
              alt="Logo"
              className={styles.logo}
              height={32}
              width={32}
            />
            {PROPERTIES.navBarHeading}
          </NavbarBrand>
          <NavbarToggle className={styles.toggle} />
          <NavbarOffcanvas className={styles.offCanvas} placement="end">
            <OffcanvasHeader closeButton>
              <OffcanvasTitle className={`text-white`}>
                {PROPERTIES.navBarHeading}
              </OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
              <Nav className={`justify-content-end flex-grow-1 pe-3`}>
                <NavLink href={"/11-13"} className={styles.navLink}>
                  {"Module 11-13"}
                </NavLink>
                <NavDropdown
                  title={<span className={"text-white"}>Languages</span>}
                >
                  <NavDropdown.Item
                    className={styles.dropdownItem}
                    onClick={() => setLang("en")}
                  >
                    English
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className={styles.dropdownItem}
                    onClick={() => setLang("de")}
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
