import styled from "styled-components";
import { spacingMap, fractions } from "./spacing";

export const Stack = styled.div`
    display: grid;
    gap: ${(props) => spacingMap[props.gutter] ?? spacingMap.lg}
    justify-items: left;
`;

export const Split = styled.div`
  display: grid;
  gap: ${(props) => spacingMap[props.gutter] ?? spacingMap.lg};
  grid-template-columns: ${({ fraction }) =>
    fractions[fraction] ?? fractions["1/2"]};
`;

export const Columns = styled.div`
    --columns: ${({ columns = 1 }) => columns}
    display: grid;
    gap: ${(props) =>
      spacingMap[props.gutter] ? spacingMap[props.gutter] : spacingMap.lg};
    grid-template-columns: repeat(var(--columns), 1fr);
`;

export const Column = styled.div`
  grid-column: span min(${({ $span = 1 }) => $span}, var(--columns)) / auto;
`;

export const Grid = styled.div`
  display: grid;
  gap: ${(props) => spacingMap[props.gutter] ?? spacingMap.lg};
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(${(props) => props.minItemWidth}, 100%), 1fr)
  );
`;

export const Navbar = styled.nav`
  background-color: #333;
  padding: 10px;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Logo = styled.a`
  color: #fff;
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;
`;

export const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
  }
`;

export const MenuItem = styled.li`
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`;

export const NavLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const MenuToggle = styled.button`
  display: none;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
