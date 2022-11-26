import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '../../../store/store';
import { dayToDayFormat } from '../../../utils';
import Inner1 from './Inner1';
import { useDispatch } from 'react-redux';
import { changeOrderPrice } from '../../../store/modules/coin';

interface OrderbookAskProps {
  index: number;
  askPrice: number;
  askSize: number;
  maxSize: number;
}

export default function OrderbookAsk({ index, askPrice, askSize, maxSize }: OrderbookAskProps) {
  const dispatch = useDispatch();
  const { prevClosingPrice, tradePrice } = useAppSelector((state) => state.coin.selectedCoin);

  const loadOrderbookLoading = useAppSelector((state) => state.coin.loadOrderbookLoading);

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    dispatch(changeOrderPrice({ orderPrice: askPrice }));
  };

  return (
    <TableRow>
      <OrderbookAskCell sx={{ width: '42px' }} />
      <OrderbookAskCell2 sx={{ width: '120px' }} align='right'>
        <a href='#'>
          <Bar style={{ width: `${(askSize / maxSize) * 100}%` }} />
          <p>{!loadOrderbookLoading && askSize.toFixed(3)}</p>
        </a>
      </OrderbookAskCell2>
      <OrderbookAskCell3
        sx={{ width: '0px' }}
        align='center'
        change={askPrice - prevClosingPrice}
        onClick={handleClick}
      >
        <a href='#'>
          <p>{!loadOrderbookLoading && askPrice.toLocaleString()}</p>
          <p style={{ marginLeft: '14px' }}>
            {!loadOrderbookLoading &&
              `${dayToDayFormat(askPrice - prevClosingPrice, prevClosingPrice)}%`}
          </p>
        </a>
        {tradePrice === askPrice ? <Seleceted /> : null}
      </OrderbookAskCell3>
      {index === 0 ? <Inner1 /> : null}
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

const Bar = styled.div`
  position: absolute;
  height: 26px;
  background-color: rgba(18, 97, 196, 0.14901960784313725);
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
