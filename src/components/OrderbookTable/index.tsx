import { Table, TableBody } from '@mui/material';
import styled from 'styled-components';
import OrderbookAsk from './OrderbookAsk';
import OrderbookBid from './OrderbookBid';

interface OrderbookTableProps {
  orderbook: {
    timestamp: number;
    totalAskSize: number;
    totalBidSize: number;
    orderbookUnits: { askPrice: number; bidPrice: number; askSize: number; bidSize: number }[];
  };
}

export default function OrderbookTable({ orderbook }: OrderbookTableProps) {
  const units = orderbook.orderbookUnits;
  return (
    <Wrapper>
      <Table>
        <TableBody>
          {units.map((unit, index) => (
            <OrderbookAsk
              key={index}
              index={index}
              askPrice={unit.askPrice}
              askSize={unit.askSize}
            />
          ))}
          {units.map((unit, index) => (
            <OrderbookBid
              key={index}
              index={index}
              bidPrice={unit.bidPrice}
              bidSize={unit.bidSize}
            />
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
