import { Table, TableBody } from '@mui/material';
import styled from 'styled-components';
import OrderbookAsk from './OrderbookAsk';
import OrderbookBid from './OrderbookBid';

interface OrderbookBodyProps {
  orderbook: {
    timestamp: number;
    totalAskSize: number;
    totalBidSize: number;
    orderbookUnits: { askPrice: number; bidPrice: number; askSize: number; bidSize: number }[];
  };
}

export default function OrderbookBody({ orderbook }: OrderbookBodyProps) {
  const units = orderbook.orderbookUnits;
  const totalAskSize = orderbook.totalAskSize;
  const totalBidSize = orderbook.totalBidSize;
  const maxSize = Math.max(
    ...units.map((unit) => (unit.askSize > unit.bidSize ? unit.askSize : unit.bidSize)),
  );

  return (
    <Wrapper>
      <Table>
        <TableBody>
          {[...units].reverse().map((unit, index) => (
            <OrderbookAsk
              key={index}
              index={index}
              askPrice={unit.askPrice}
              askSize={unit.askSize}
              maxSize={maxSize}
            />
          ))}
          {units.map((unit, index) => (
            <OrderbookBid
              key={index}
              index={index}
              bidPrice={unit.bidPrice}
              bidSize={unit.bidSize}
              maxSize={maxSize}
            />
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 600px;
  overflow: scroll;
`;
