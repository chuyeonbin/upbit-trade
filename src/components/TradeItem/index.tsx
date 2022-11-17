import { TableRow, TableCell } from '@mui/material';
import styled from 'styled-components';

export default function TradeItem() {
  return (
    <TradeItemRow>
      <TradeItemCell>
        11.17<i>16:22</i>
      </TradeItemCell>
      <TradeItemCell>22,260,000</TradeItemCell>
      <TradeItemCell>0.0000731</TradeItemCell>
      <TradeItemCell>1,133,122</TradeItemCell>
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
