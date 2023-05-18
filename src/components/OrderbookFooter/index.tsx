import styled from 'styled-components';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useAppSelector } from '../../store/store';

interface OrderbookFooterProps {
  totalAskSize: number;
  totalBidSize: number;
}

export default function OrderbookFooter({ totalAskSize, totalBidSize }: OrderbookFooterProps) {
  const market = useAppSelector((state) => state.coin.selectedCoin.market);

  return (
    <Wrapper>
      <Table>
        <TableBody>
          <OrderbookFooterRow>
            <OrderbookFooterCell align='right'>{totalAskSize.toFixed(3)}</OrderbookFooterCell>
            <OrderbookFooterCell align='center'>
              <strong>수량</strong>
              <i>({market.substring(4)})</i>
            </OrderbookFooterCell>
            <OrderbookFooterCell align='left'>{totalBidSize.toFixed(3)}</OrderbookFooterCell>
          </OrderbookFooterRow>
        </TableBody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const OrderbookFooterRow = styled(TableRow)`
  & > td:nth-child(2) {
    border-left: 1px solid #f1f1f4;
    border-right: 1px solid #f1f1f4;
  }
`;

const OrderbookFooterCell = styled(TableCell)`
  && {
    padding: 0 8px;
    width: 33.33333%;
    border-top: 1px solid #f1f1f4;
    border-bottom: 1px solid #f1f1f4;
    height: 45px;
    background-color: #f9fafc;
    font-size: 12px;
  }

  & > i {
    font-size: ${({ theme }) => theme.fontSize.microSmall};
    font-style: none;
  }
`;
