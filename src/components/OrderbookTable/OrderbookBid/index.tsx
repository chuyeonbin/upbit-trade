import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';

interface OrderbookBidProps {
  index: number;
}

export default function OrderbookBid({ index }: OrderbookBidProps) {
  return (
    <TableRow>
      {index === 0 ? (
        <Inner2 rowSpan={15} colSpan={2}>
          <div>inner2</div>
        </Inner2>
      ) : null}
      <OrderbookBidCell2 sx={{ width: '0px' }} align='center'>
        <a href='#'>
          <p>23,920,000</p>
          <p style={{ marginLeft: '14px' }}>-4.24%</p>
        </a>
      </OrderbookBidCell2>
      <OrderbookBidCell3 sx={{ width: '120px' }} align='right'>
        <a href='#'>
          <div />
          <p>1.092</p>
        </a>
      </OrderbookBidCell3>
      <OrderbookBidCell3 sx={{ width: '42px' }} />
    </TableRow>
  );
}

const OrderbookBidCell = styled(TableCell)`
  && {
    padding: 0 8px;
    height: 45px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    background-color: rgba(200, 74, 49, 0.0784313725490196);
    font-size: 13px;
  }
`;

const OrderbookBidCell2 = styled(OrderbookBidCell)`
  & > a {
    width: 150px;
    display: flex;
    justify-content: flex-end;
  }
`;

const OrderbookBidCell3 = styled(OrderbookBidCell)`
  && {
    padding-left: 0;
  }

  & > a {
    position: relative;
    display: flex;
    justify-content: flex-start;
    height: 26px;
    line-height: 26px;
    z-index: 1;
  }

  & > a > div {
    position: absolute;
    width: 9%;
    height: 26px;
    background-color: rgba(200, 74, 49, 0.14901960784313725);
  }
`;

const Inner2 = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: top;
  }
`;
