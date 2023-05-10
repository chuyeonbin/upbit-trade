import styled from 'styled-components';
import { tradingValueFormat } from '../../../utils';

interface TradingValueCellProps {
  accTradePrice24h: number;
}

export default function TradingValueCell({ accTradePrice24h }: TradingValueCellProps) {
  const tradingValue = tradingValueFormat(accTradePrice24h);
  return (
    <Wrapper>
      <span>{tradingValue}</span>
      <i>백만</i>
    </Wrapper>
  );
}

const Wrapper = styled.td`
  & > span {
    color: black;
  }
  & > i {
    color: #666;
  }
`;
