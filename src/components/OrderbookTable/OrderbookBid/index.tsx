import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '../../../store/store';
import { dayToDayFormat } from '../../../utils';

interface OrderbookBidProps {
  index: number;
  bidPrice: number;
  bidSize: number;
  maxSize: number;
}

export default function OrderbookBid({ index, bidPrice, bidSize, maxSize }: OrderbookBidProps) {
  const { prevClosingPrice, tradePrice } = useAppSelector((state) => state.coin.selectedCoin);

  const loadOrderbookLoading = useAppSelector((state) => state.coin.loadOrderbookLoading);

  return (
    <TableRow>
      {index === 0 ? (
        <Inner2 rowSpan={15} colSpan={2}>
          <div>inner2</div>
        </Inner2>
      ) : null}
      <OrderbookBidCell2 sx={{ width: '0px' }} align='center' change={bidPrice - prevClosingPrice}>
        <a href='#'>
          <p>{bidPrice.toLocaleString()}</p>
          <p style={{ marginLeft: '14px' }}>
            {!loadOrderbookLoading &&
              `${dayToDayFormat(bidPrice - prevClosingPrice, prevClosingPrice)}%`}
          </p>
        </a>
        {tradePrice === bidPrice ? <Seleceted /> : null}
      </OrderbookBidCell2>
      <OrderbookBidCell3 sx={{ width: '120px' }} align='right'>
        <a href='#'>
          <Bar style={{ width: `${(bidSize / maxSize) * 100}%` }} />
          <p>{!loadOrderbookLoading && bidSize.toFixed(3)}</p>
        </a>
      </OrderbookBidCell3>
      <OrderbookBidCell3 sx={{ width: '42px' }} />
    </TableRow>
  );
}

const OrderbookBidCell = styled(TableCell)`
  && {
    padding: 0 8px;
    height: 45px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    background-color: rgba(200, 74, 49, 0.0784313725490196);
    font-size: 13px;
  }
`;

const OrderbookBidCell2 = styled(OrderbookBidCell)<{ change: number }>`
  && {
    position: relative;
  }
  & > a {
    width: 150px;
    display: flex;
    justify-content: flex-end;
    color: ${({ change, theme }) =>
      change > 0 ? theme.colors.lightRed : change < 0 ? theme.colors.lightBlue : 'black'};
    font-weight: 600;
  }
`;

const OrderbookBidCell3 = styled(OrderbookBidCell)`
  && {
    padding-left: 0;
  }

  & > a {
    position: relative;
    display: flex;
    justify-content: flex-start;
    height: 26px;
    line-height: 26px;
    z-index: 1;
  }
`;

const Bar = styled.div`
  position: absolute;
  height: 26px;
  background-color: rgba(200, 74, 49, 0.14901960784313725);
  max-width: 100%;
`;

const Seleceted = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #333;

  ::after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-color: transparent transparent transparent #333;
    border-style: solid;
    border-width: 6px 0 6px 6px;
    content: '';
  }
`;

const Inner2 = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: top;
  }
`;
