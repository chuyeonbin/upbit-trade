import { TableCell } from '@mui/material';
import styled from 'styled-components';
import { useAppSelector } from '../../../../store/store';

export default function inner2() {
  const trades = useAppSelector((state) => state.coin.tradeList);

  return (
    <Inner2 rowSpan={15} colSpan={2}>
      <Wrapper>
        <Table>
          <TableHead>
            <Tr>
              <Th>체결가</Th>
              <Th>체결량</Th>
            </Tr>
          </TableHead>
          <tbody>
            {trades.slice(0, 30).map((trade) => (
              <Tr key={trade.sequentialId}>
                <Td>{trade.tradePrice.toLocaleString()}</Td>
                <Td>{Number(trade.tradeVolume.toFixed(3)).toLocaleString()}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </Inner2>
  );
}

const Inner2 = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: top;
    font-size: ${({ theme }) => theme.fontSize.microSmall};
  }
`;

const Wrapper = styled.div`
  height: 420px;
  overflow: hidden;
`;

const Dl = styled.dl`
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  position: relative;
  color: #666;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 10px;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.colors.lightGray};
    content: '';
  }
`;

const Tr = styled.tr``;

const Th = styled.th`
  height: 30px;
  text-align: center;
  font-weight: normal;
  background-color: #f9fafc;
`;

const Td = styled.td`
  padding: 4px;
  width: 50%;
  text-align: right;
`;
