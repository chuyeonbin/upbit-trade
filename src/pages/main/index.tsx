import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CoinHeader from '../../components/CoinHeader';
import CoinList from '../../components/CoinList';
import MainChart from '../../components/MainChart';
import Order from '../../components/Order';
import Orderbook from '../../components/Orderbook';
import TradeList from '../../components/TradeList';
import { startInit } from '../../store/modules/start';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);
  return (
    <Container>
      <LayoutA>
        <CoinHeader />
        <MainChart />
        <OrderContainer>
          <Orderbook />
          <Order />
        </OrderContainer>
        <TradeList />
      </LayoutA>
      <LayoutB>
        <CoinList />
      </LayoutB>
    </Container>
  );
}

const Container = styled.div`
  margin: 5px auto;
  display: flex;
  width: 1400px;
`;

const OrderContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const LayoutA = styled.section`
  margin-right: 5px;
  width: 990px;
`;

const LayoutB = styled.section`
  margin-left: 5px;
  flex-grow: 1;
  position: sticky;
  top: 5px;
  height: 100vh;
  overflow: scroll;
`;
