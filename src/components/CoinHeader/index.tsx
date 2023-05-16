import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import { tradeVolume24hFormat } from '../../utils';
import HeaderTitle from './HeaderTitle';
import HeaderLeft from './HeaderLeft';

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
        <PriceWrapper>
          <PriceA>
            <HP>
              고가 <span>{selectedCoin.highPrice.toLocaleString()}</span>
            </HP>
            <LP>
              저가 <span>{selectedCoin.lowPrice.toLocaleString()}</span>
            </LP>
          </PriceA>
          <PriceB>
            <ATV24H>
              거래량(24H)
              <span>
                {tradeVolume24hFormat(selectedCoin.accTradeVolume24h)}{' '}
                <i>{selectedCoin.code.substring(4)}</i>
              </span>
            </ATV24H>
            <ATP24H>
              거래대금(24H)
              <span>
                {Math.round(selectedCoin.accTradePrice24h).toLocaleString()} <i>KRW</i>
              </span>
            </ATP24H>
          </PriceB>
        </PriceWrapper>
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

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  font-size: ${({ theme }) => theme.fontSize.micro};
`;

const PriceA = styled.div`
  margin-left: 16px;
  flex-basis: 50%;
`;

const HP = styled.div`
  padding-bottom: 11px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  & > span {
    color: ${({ theme }) => theme.colors.lightRed};
    font-weight: 500;
  }
`;

const LP = styled.p`
  padding-top: 11px;

  display: flex;
  justify-content: space-between;

  & > span {
    color: ${({ theme }) => theme.colors.lightBlue};
    font-weight: 500;
  }
`;

const PriceB = styled.div`
  margin-left: 16px;
  flex-basis: 50%;
`;

const ATV24H = styled.p`
  padding-bottom: 11px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  & > span > i {
    font-size: ${({ theme }) => theme.fontSize.microSmall};
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const ATP24H = styled.p`
  padding-top: 11px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  & > span > i {
    font-size: ${({ theme }) => theme.fontSize.microSmall};
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
