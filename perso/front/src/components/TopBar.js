import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useHistory } from "react-router";

export default function TopBar() {
  const history = useHistory();

  function redirect(e) {
    e.preventDefault();
    history.push(e.target.getAttribute("href"));
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>DemandeMoi</Navbar.Brand>
      <Navbar.Toggle aria-controls="topbar-nav" />
      <Navbar.Collapse id="topbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" onClick={redirect}>
            Voir les questions
          </Nav.Link>
          <Nav.Link href="/ask" onClick={redirect}>
            Poser une question
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
