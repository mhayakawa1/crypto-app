import styled from "styled-components";

export const DisplayButtons = styled.div`
  width: fit-content;
  padding: 4px;
  background-color: #191925;
  border-radius: 6px;
`;

export const Button = styled.button`
  width: 244px;
  height: 45px;
  border-radius: 6px;
  &.active {
    border: double 1px transparent;
    background-image: linear-gradient(#6161d6, #6161d6),
      linear-gradient(#7878fa, #6161d6);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  &.inactive {
    background-color: #232336;
  }
  &.compare {
    width: fit-content;
    display: flex;
    gap: 10px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 400;
  }
  &.slider-button {
    width: 253px;
    height: 78px;
    &.active {
      box-shadow: 4px 4px 15px 2px #7878fa26;
    }
  }
  &.time-range-button {
    width: 56px;
    height: 34px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    &.inactive {
      background-color: rgb(0, 0, 0, 0);
    }
  }
  &.dropdown {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 24px;
    flex-grow: 1;
    font-size: 20px;
  }
  &.convert {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Display = styled.div`
  padding: 4vh 0 0 0;
  overflow-x: hidden;
`;

export const Statistics = styled.div`
`;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 0 4vh 0;
`;

export const CompareIcon = styled.img`
  width: 24px;
  height: 24px;
`

export const Slider = styled.div`
  width: fit-content;
  display: flex;
  gap: 8px;
  overflow-x: hidden;
  padding: 0 0 4vh 0;
`;

export const Table = styled.table`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0px 8px;
  margin: 16vh 0 0 0;
`;

export const TableRow = styled.tr`
  &.column-names {
  }
  &.coin {
    background: #191925;
    padding: 20px;
    border-radius: 12px;
    height: 77px;
  }
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableHeader = styled.th`
  margin: 0 4px;
  text-align: left;
`;

export const TableCell = styled.td`
  &.number {
    text-align: center;
    padding: 0 10px;
  }
`;

export const CellContainer = styled.div`
  display: flex;
  align-items: center;
  &.rising {
    color: #01f1e3;
  }
  &.falling {
    color: #fe2264;
  }
`;

export const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 16px 0 0;
`;

export const ArrowIcon = styled.img`
  width: 6px;
  height: 3px;
  margin: 5px;
`;

export const Charts = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  &.conversion-data {
    aspect-ratio: 1296 / 293;
  }
`;

export const Chart = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  flex-grow: 1;
  aspect-ratio: 158 / 101;
  background-color: #191932;
  border-radius: 12px;
  font-weight: 400;
  font-size: 20px;
  padding: 24px;
`;

export const ChartData = styled.div`
  flex-grow: 1;
`;

export const ChartUl = styled.ul`
  font-weight: 400;
`;

export const ChartLi = styled.li`
  color: #d1d1d1;
  &.name {
    font-size: 20px;
    line-height: 24px;
  }
  &.value {
    font-size: 28px;
    color: white;
    line-height: 24px;
    padding: 24px 0 16px 0;
  }
  &.date {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const TimeRanges = styled.div`
  width: fit-content;
  height: 42px;
  padding: 4px;
  margin: 56px 0 0 0;
  display: flex;
  gap: 8px;
  border-radius: 6px;
  background-color: #232336;
`;

export const ConversionInputs = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin: 0 0 72px 0;
`;

export const ConversionInput = styled.div`
  flex-grow: 1;
  background-color: #191932;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 5;
`;

export const InputUl = styled.ul`
`;

export const InputLi = styled.li`
  font-weight: 400;
  &.transaction {
    font-size: 14px;
    line-height: 24px;
    margin: 0 0 40px 0;
  }
  &.conversion {
    margin: 8px;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0px;
  }
`;

export const CurrencyDropdown = styled.div`
  display: flex;
  align-items: start;
  padding: 0 0 24px 0;
  border-bottom: 1px solid white;
`;

export const CurrencyIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const DropdownIcon = styled.img`
  width: 6px;
  height: 3px;
`;

export const InputAmount = styled.span``;
