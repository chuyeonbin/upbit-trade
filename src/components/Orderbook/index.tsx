import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import OrderbookHeader from '../OrderbookHeader';
import OrderbookTable from '../OrderbookTable';

export default function Orderbook() {
  const orderbook = useAppSelector((state) => state.coin.orderbook);
  return (
    <Wrapper>
      <OrderbookHeader />
      <OrderbookTable orderbook={orderbook} />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 500px;
`;
