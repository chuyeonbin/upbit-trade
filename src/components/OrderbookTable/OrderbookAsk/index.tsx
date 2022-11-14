import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '../../../store/store';
import { dayToDayFormat } from '../../../utils';

interface OrderbookAskProps {
  index: number;
  askPrice: number;
  askSize: number;
  maxSize: number;
}

export default function OrderbookAsk({ index, askPrice, askSize, maxSize }: OrderbookAskProps) {
  const { prevClosingPrice, signedChangePrice } = useAppSelector(
    (state) => state.coin.selectedCoin,
  );
  return (
    <TableRow>
      <OrderbookAskCell sx={{ width: '42px' }} />
      <OrderbookAskCell2 sx={{ width: '120px' }} align='right'>
        <a href='#'>
          <Bar style={{ width: `${(askSize / maxSize) * 100}%` }} />
          <p>{askSize.toFixed(3)}</p>
        </a>
      </OrderbookAskCell2>
      <OrderbookAskCell3 sx={{ width: '0px' }} align='center' change={signedChangePrice}>
        <a href='#'>
          <p>{askPrice.toLocaleString()}</p>
          <p style={{ marginLeft: '14px' }}>
            {dayToDayFormat(askPrice - prevClosingPrice, prevClosingPrice)}%
          </p>
        </a>
      </OrderbookAskCell3>
      {index === 0 ? (
        <Inner1 rowSpan={15} colSpan={2}>
          <div>inner1</div>
        </Inner1>
      ) : null}
    </TableRow>
  );
}

const OrderbookAskCell = styled(TableCell)`
  && {
    padding: 0 8px;
    height: 45px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    background-color: rgba(18, 97, 196, 0.0784313725490196);
    font-size: 13px;
  }
`;

const OrderbookAskCell2 = styled(OrderbookAskCell)`
  && {
    padding-right: 0;
  }

  & > a {
    position: relative;
    display: flex;
    justify-content: flex-end;
    height: 26px;
    line-height: 26px;
    z-index: 1;
  }
`;

const OrderbookAskCell3 = styled(OrderbookAskCell)<{ change: number }>`
  & > a {
    width: 150px;
    display: flex;
    justify-content: flex-end;
    color: ${({ change, theme }) =>
      change > 0 ? theme.colors.lightRed : change < 0 ? theme.colors.lightBlue : 'black'};
    font-weight: 600;
  }
`;

const Bar = styled.div`
  position: absolute;
  height: 26px;
  background-color: rgba(18, 97, 196, 0.14901960784313725);
  max-width: 100%;
`;

const Inner1 = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: bottom;
  }
`;
