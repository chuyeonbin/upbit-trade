import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import HeaderTitle from './HeaderTitle';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

export default function CoinHeader() {
  const selectedCoin = useAppSelector((state) => state.coin.selectedCoin);

  return (
    <HeaderWrapper>
      <HeaderTitle market={selectedCoin.code} koreanName={selectedCoin.marketName} />
      <HeaderBody>
        <HeaderLeft
          signedChangePrice={selectedCoin.signedChangePrice}
          tradePrice={selectedCoin.tradePrice}
          prevClosingPrice={selectedCoin.prevClosingPrice}
        />
        <HeaderRight
          highPrice={selectedCoin.highPrice}
          lowPrice={selectedCoin.lowPrice}
          accTradeVolume24h={selectedCoin.accTradeVolume24h}
          accTradePrice24h={selectedCoin.accTradePrice24h}
          market={selectedCoin.code}
        />
      </HeaderBody>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.article`
  width: 990px;
  background-color: white;
`;

const HeaderBody = styled.div`
  padding: 18px 20px 14px;
  display: flex;
  justify-content: space-between;
`;
