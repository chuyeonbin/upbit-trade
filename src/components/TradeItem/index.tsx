import { TableRow, TableCell } from '@mui/material';
import styled from 'styled-components';
import { tradePriceFormat } from '../../utils';
import { getMonth, getDate, getHours, getMinutes } from 'date-fns';

interface TradeItemProps {
  trade: {
    timestamp: number;
    tradePrice: number;
    tradeVolume: number;
    askBid: 'ASK' | 'BID';
  };
}

export default function TradeItem({ trade }: TradeItemProps) {
  const month = getMonth(trade.timestamp) + 1;
  const date = getDate(trade.timestamp);
  const hour = getHours(trade.timestamp);
  const minute = getMinutes(trade.timestamp);

  return (
    <TradeItemRow>
      <TradeItemCell>
        {month}.{date}
        <i>
          {hour}:{minute}
        </i>
      </TradeItemCell>
      <TradeItemCell>{trade.tradePrice.toLocaleString()}</TradeItemCell>
      <TradeVolume askbid={trade.askBid}>{trade.tradeVolume.toFixed(8)}</TradeVolume>
      <TradeItemCell>{tradePriceFormat(trade.tradePrice, trade.tradeVolume)}</TradeItemCell>
    </TradeItemRow>
  );
}

const TradeItemRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f9fafc',
    color: theme.colors.darkGray,
  },
  '& > td': {
    borderBottom: 0,
  },
  '& > td:nth-child(1)': {
    width: '10%',
  },
  '& > td:nth-child(2)': {
    fontWeight: '600',
  },
  '& > td:nth-child(2), & > td:nth-child(3), & > td:nth-child(4)': {
    textAlign: 'right',
    width: '30%',
  },
  '& > td:nth-child(4)': {
    paddingRight: '12px',
  },
}));

const TradeItemCell = styled(TableCell)`
  height: 30px;

  && {
    padding: 0;
    text-align: center;
    font-size: 11px;
  }

  & > i {
    padding-left: 8px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const TradeVolume = styled(TradeItemCell)<{ askbid: 'ASK' | 'BID' }>`
  && {
    color: ${({ theme, askbid }) =>
      askbid === 'BID' ? theme.colors.lightRed : theme.colors.lightBlue};
  }
`;
