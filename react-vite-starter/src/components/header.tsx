import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { changeMode } from "../redux/app/app.slide";

function Header() {
  const users = useAppSelector((state) => state.user.listUsers);
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
      <Container>
        <Navbar.Brand href="#home">Redux {users.length}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form.Check
            defaultChecked={mode === "light" ? false : true}
            onChange={(e) => {
              dispatch(
                changeMode(e.target.checked === true ? "dark" : "light")
              );
            }}
            type="switch"
            id="custom-switch"
            label={
              mode === "light" ? (
                <Navbar.Text>Light mode</Navbar.Text>
              ) : (
                <Navbar.Text>Dark mode</Navbar.Text>
              )
            }
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
