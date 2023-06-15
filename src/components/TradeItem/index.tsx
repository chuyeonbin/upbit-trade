import styled from 'styled-components';
import { tradePriceFormat } from '../../utils';
import { getMonth, getDate, getHours, getMinutes } from 'date-fns';
import { useAppSelector } from '../../store/store';

interface TradeItemProps {
  trade: {
    timestamp: number;
    tradePrice: number;
    tradeVolume: number;
    askBid: 'ASK' | 'BID';
  };
}

export default function TradeItem({ trade }: TradeItemProps) {
  const prevClosingPrice = useAppSelector((state) => state.coin.selectedCoin.prevClosingPrice);

  const month = getMonth(trade.timestamp) + 1;
  const date = getDate(trade.timestamp);
  const hour = getHours(trade.timestamp);
  const minute = getMinutes(trade.timestamp);

  return (
    <TradeItemRow>
      <TradeTime>
        {month}.{date}
        <i>
          {hour}:{minute}
        </i>
      </TradeTime>
      <TradePrice price={trade.tradePrice - prevClosingPrice}>
        {trade.tradePrice.toLocaleString()}
      </TradePrice>
      <TradeVolume askbid={trade.askBid}>
        {Number(trade.tradeVolume.toFixed(8)).toLocaleString(undefined, {
          minimumFractionDigits: 8,
        })}
      </TradeVolume>
      <TradeItemCell>{tradePriceFormat(trade.tradePrice, trade.tradeVolume)}</TradeItemCell>
    </TradeItemRow>
  );
}

const TradeItemRow = styled.tr`
  &:nth-child(even) {
    background: #f9fafc;
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 400;
  }

  & > td:nth-child(2) {
  }

  & > td:nth-child(2),
  & > td:nth-child(3),
  & > td:nth-child(4) {
    text-align: right;
    width: 30%;
  }

  & > td:nth-child(4) {
    padding-right: 12px;
    color: black;
  }
`;

const TradeItemCell = styled.td`
  height: 30px;
  font-size: 11px;
  text-align: center;
  border: none;
`;

const TradeTime = styled(TradeItemCell)`
  color: black;
  & > i {
    padding-left: 8px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const TradePrice = styled(TradeItemCell)<{ price: number }>`
  font-weight: 600;
  color: ${({ theme, price }) =>
    price > 0 ? theme.colors.lightRed : price < 0 ? theme.colors.lightBlue : 'black'};
`;

const TradeVolume = styled(TradeItemCell)<{ askbid: 'ASK' | 'BID' }>`
  color: ${({ theme, askbid }) =>
    askbid === 'BID' ? theme.colors.lightRed : theme.colors.lightBlue};
`;
