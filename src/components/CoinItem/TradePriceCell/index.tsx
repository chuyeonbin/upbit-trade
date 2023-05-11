import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface TradePriceCellProps {
  tradePrice: number;
}

export default function TradePriceCell({ tradePrice }: TradePriceCellProps) {
  const prevTradePriceRef = useRef(tradePrice);

  useEffect(() => {
    if (tradePrice !== prevTradePriceRef.current) {
      prevTradePriceRef.current = tradePrice;
    }
  }, [tradePrice]);

  return (
    <Wrapper>
      <strong>{tradePrice.toLocaleString()}</strong>
      {tradePrice > prevTradePriceRef.current ? (
        <Up />
      ) : tradePrice < prevTradePriceRef.current ? (
        <Down />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.td`
  position: relative;
`;

const Highlight = styled.span`
  position: absolute;
  top: 3%;
  left: 2%;
  width: 96%;
  height: 94%;
`;

const borderColor = (color: string) => keyframes`
  0% {
    border: 1px solid ${color};
  }
  100% {
    border: 1px solid ${color};
  }
`;

const Up = styled(Highlight)`
  border: 1px solid transparent;
  animation: ${({ theme }) => borderColor(theme.colors.lightRed)} 0.5s;
`;

const Down = styled(Highlight)`
  border: 1px solid transparent;
  animation: ${({ theme }) => borderColor(theme.colors.lightBlue)} 0.5s;
`;
