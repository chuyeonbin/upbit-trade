import { TableCell } from '@mui/material';
import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface PriceCellProps {
  price: number;
}

export default function PriceCell({ price }: PriceCellProps) {
  const prevPriceRef = useRef(price);

  useEffect(() => {
    if (price !== prevPriceRef.current) {
      prevPriceRef.current = price;
    }
  }, [price]);

  return (
    <CoinCell>
      {price.toLocaleString()}
      {price > prevPriceRef.current ? <Up /> : price < prevPriceRef.current ? <Down /> : null}
    </CoinCell>
  );
}

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

const CoinCell = styled(TableCell)`
  height: 45px;

  && {
    padding: 0;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }

  & > i {
    color: #666;
  }
`;
