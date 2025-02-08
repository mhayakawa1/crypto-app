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
    padding: 12px 24px;
    font-size: 14px;
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
    padding: 8px 20px;
    border-radius: 6px;
    font-family: Space Grotesk;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    &.inactive {
      background-color: rgb(0, 0, 0, 0);
    }
  }
  color: white;
`;

export const Statistics = styled.div``;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const Slider = styled.div`
  width: fit-content;
  display: flex;
  gap: 8px;
  overflow-x: hidden;
  padding: 24px 0;
`;

export const Charts = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
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
  color: white;
  padding: 24px;
`;

export const ChartData = styled.div`
  border: 1px solid red;
  flex-grow: 1;
`;

export const ChartUl = styled.ul`
  font-family: Space Grotesk;
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
