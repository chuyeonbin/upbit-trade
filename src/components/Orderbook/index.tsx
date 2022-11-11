import styled from 'styled-components';
import OrderbookHeader from '../OrderbookHeader';
import OrderbookTable from '../OrderbookTable';

export default function Orderbook() {
  return (
    <Wrapper>
      <OrderbookHeader />
      <OrderbookTable />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 500px;
`;
