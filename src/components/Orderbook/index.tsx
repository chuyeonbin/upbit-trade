import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import OrderbookHeader from '../OrderbookHeader';
import OrderbookBody from '../OrderbookBody';
import OrderbookFooter from '../OrderbookFooter';

export default function Orderbook() {
  const orderbook = useAppSelector((state) => state.coin.orderbook);
  return (
    <Wrapper>
      <OrderbookHeader />
      <OrderbookBody orderbook={orderbook} />
      <OrderbookFooter
        totalAskSize={orderbook.totalAskSize}
        totalBidSize={orderbook.totalBidSize}
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 500px;
`;
