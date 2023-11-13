import styled from 'styled-components';
import { useAppSelector } from '../../../store/store';

interface OrderbookFooterProps {
  totalAskSize: number;
  totalBidSize: number;
}

export default function OrderbookFooter({ totalAskSize, totalBidSize }: OrderbookFooterProps) {
  const market = useAppSelector((state) => state.coin.selectedCoin.market);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell align='right'>{totalAskSize.toFixed(3)}</TableCell>
          <TableCell align='center'>
            <strong>수량</strong>
            <i>({market.substring(4)})</i>
          </TableCell>
          <TableCell align='left'>{totalBidSize.toFixed(3)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;

  & > td:nth-child(1) {
    text-align: right;
  }

  & > td:nth-child(2) {
    text-align: center;
    border-left: 1px solid #f1f1f4;
    border-right: 1px solid #f1f1f4;
  }

  & > td:nth-child(3) {
    text-align: left;
  }
`;

const TableCell = styled.td`
  flex-grow: 1;
  padding: 0 8px;
  height: 45px;
  line-height: 45px;
  border-top: 1px solid #f1f1f4;
  border-bottom: 1px solid #f1f1f4;
  background-color: #f9fafc;
  font-size: 12px;

  & > i {
    font-size: ${({ theme }) => theme.fontSize.microSmall};
  }
`;
