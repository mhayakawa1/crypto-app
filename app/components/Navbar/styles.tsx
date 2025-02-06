import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  gap: 10px;
  font-family: Inter;
  font-size: 21px;
  font-weight: 700;
  color: white;
`;

export const LogoImage = styled.img`
  width: 35px;
  height: 20px;
  margin: auto;
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
  font-family: Space Grotesk;
  font-size: 16px;
  font-weight: 500;
  &.home-active {
    color: white;
  }
  &.home-inactive {
    color: #353570;
    opacity: .5;
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
  height: 48px;
  width: auto;
  margin: 0;
  padding: 0 16px;
  gap: 12px;
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
  color: white;
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
  color: white;
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
  color: white;
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
  font-family: Space Grotesk;
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