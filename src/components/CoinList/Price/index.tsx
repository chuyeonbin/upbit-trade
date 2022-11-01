import { TableCell } from '@mui/material';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface PriceProps {
  price: number;
}

export default function Price({ price }: PriceProps) {
  return <CoinCell>{price.toLocaleString()}</CoinCell>;
}

const Highlight = styled.span`
  position: absolute;
  top: 3%;
  left: 2%;
  width: 96%;
  height: 94%;
`;

const Up = styled(Highlight)`
  border: 1px solid ${({ theme }) => theme.colors.lightRed};
`;

const Down = styled(Highlight)`
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
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
