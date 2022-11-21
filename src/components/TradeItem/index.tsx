import { TableRow, TableCell } from '@mui/material';
import styled from 'styled-components';
import { tradePriceFormat } from '../../utils';

interface TradeItemProps {
  trade: {
    tradeDate: string;
    tradeTime: string;
    tradePrice: number;
    tradeVolume: number;
    askBid: 'ASK' | 'BID';
  };
}

export default function TradeItem({ trade }: TradeItemProps) {
  return (
    <TradeItemRow>
      <TradeItemCell>
        {trade.tradeDate}
        <i>{trade.tradeTime}</i>
      </TradeItemCell>
      <TradeItemCell>{trade.tradePrice.toLocaleString()}</TradeItemCell>
      <TradeItemCell>{trade.tradeVolume.toFixed(8)}</TradeItemCell>
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
