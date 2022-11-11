import { Table, TableBody } from '@mui/material';
import styled from 'styled-components';
import OrderbookAsk from './OrderbookAsk';
import OrderbookBid from './OrderbookBid';

export default function OrderbookTable() {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <Wrapper>
      <Table>
        <TableBody>
          {test.map((value, index) => (
            <OrderbookAsk key={index} index={index} />
          ))}
          {test.map((value, index) => (
            <OrderbookBid key={index} index={index} />
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
