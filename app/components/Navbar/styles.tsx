import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 21px;
  font-weight: 700;
`;

export const LogoImage = styled.img`
  margin: auto;
  width: 35px;
  height: 20px;
`;

export const Links = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

export const LinkItem = styled.button.attrs(() => ({ tabIndex: 0 }))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  &.home-active {
    color: white;
  }
  &.home-inactive {
    opacity: 0.5;
    color: #353570;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0 16px;
  height: 48px;
  width: auto;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #191925;
`;

export const Search = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  &:focus {
    outline: none;
  }
`;

export const Dropdown = styled.div`
  position: relative;
  width: 108px;
  height: 48px;
  margin: 0;
  padding: 0;
  background-color: rgb(0, 0, 0, 0);
`;

export const Select = styled.ul`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: auto;
  width: 100%;
  border-radius: 12px;
  margin: 0;
  padding: 0;
  background-color: #191925;
  &:focus {
    outline: none;
  }
`;

export const Option = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 108px;
  height: 48px;
  margin: 0;
  list-style-type: none;
`;

export const SelectButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 0 0 0 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;

export const CurrencyIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const ThemeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #191925;
`;
