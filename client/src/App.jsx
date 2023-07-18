import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Stack,
  Navbar,
  NavContainer,
  Logo,
  MenuItem,
  Menu,
  NavLink
} from "./styledComponents/styled";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar>
      <NavContainer>
        <Logo href="/">Logo</Logo>
        <Menu>
          <MenuItem>
            <NavLink href="/">Home</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink href="/about">About</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink href="/products">Products</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink href="/contact">Contact</NavLink>
          </MenuItem>
        </Menu>
        <MenuToggle onClick={handleToggleMenu}>
          {isMenuOpen ? "Close" : "Menu"}
        </MenuToggle>
      </NavContainer>
    </Navbar>
  );
}

export default App;
