import styled from 'styled-components';
import { TableCell, TableRow } from '@mui/material';

interface OrderbookAskProps {
  index: number;
}

export default function OrderbookAsk({ index }: OrderbookAskProps) {
  return (
    <TableRow>
      <OrderbookAskCell sx={{ width: '42px' }} />
      <OrderbookAskCell2 sx={{ width: '120px' }} align='right'>
        <a href='#'>
          <div />
          <p>1.092</p>
        </a>
      </OrderbookAskCell2>
      <OrderbookAskCell3 sx={{ width: '0px' }} align='center'>
        <a href='#'>
          <p>23,920,000</p>
          <p style={{ marginLeft: '14px' }}>-4.24%</p>
        </a>
      </OrderbookAskCell3>
      {index === 0 ? (
        <Inner1 rowSpan={15} colSpan={2}>
          <div>inner1</div>
        </Inner1>
      ) : null}
    </TableRow>
  );
}

const OrderbookAskCell = styled(TableCell)`
  && {
    padding: 0 8px;
    height: 45px;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    background-color: rgba(18, 97, 196, 0.0784313725490196);
    font-size: 13px;
  }
`;

const OrderbookAskCell2 = styled(OrderbookAskCell)`
  && {
    padding-right: 0;
  }

  & > a {
    position: relative;
    display: flex;
    justify-content: flex-end;
    height: 26px;
    line-height: 26px;
    z-index: 1;
  }

  & > a > div {
    position: absolute;
    width: 9%;
    height: 26px;
    background-color: rgba(18, 97, 196, 0.14901960784313725);
  }
`;

const OrderbookAskCell3 = styled(OrderbookAskCell)`
  & > a {
    width: 150px;
    display: flex;
    justify-content: flex-end;
  }
`;

const Inner1 = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: bottom;
  }
`;