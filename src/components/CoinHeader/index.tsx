import styled from 'styled-components';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppSelector } from '../../store/store';
import { dayToDayFormat, signedChangePriceFormat, tradeVolume24hFormat } from '../../utils';

export default function CoinHeader() {
  const selectedCoin = useAppSelector((state) => state.coin.selectedCoin);

  const logoUrl = `https://static.upbit.com/logos/${selectedCoin.code.substring(4)}.png`;

  return (
    <HeaderWrapper>
      <TitleWrapper>
        <Logo src={logoUrl} />
        <KoreanName>{selectedCoin.marketName}</KoreanName>
        <EnglishName>{selectedCoin.code.substring(4)}/KRW</EnglishName>
      </TitleWrapper>
      <HeaderBody>
        <TradePriceWrapper change={selectedCoin.signedChangePrice}>
          <TradePrice>
            {selectedCoin.tradePrice.toLocaleString()}
            <span>KRW</span>
          </TradePrice>
          <ChangeWrapper>
            <span>전일대비</span>
            <span>
              {dayToDayFormat(selectedCoin.signedChangePrice, selectedCoin.prevClosingPrice)}%
            </span>
            {selectedCoin.signedChangePrice > 0 ? (
              <ArrowDropUpIcon />
            ) : selectedCoin.signedChangePrice < 0 ? (
              <ArrowDropDownIcon />
            ) : null}
            <span>{signedChangePriceFormat(selectedCoin.signedChangePrice)}</span>
          </ChangeWrapper>
        </TradePriceWrapper>
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const Logo = styled.img`
  margin-left: 14px;
  width: 26px;
  height: 26px;
`;

const KoreanName = styled.h4`
  margin-left: 12px;
`;

const EnglishName = styled.p`
  margin-top: 7px;
  margin-left: 3px;
  font-size: 12px;
  color: #666;
`;

const TradePriceWrapper = styled.div<{ change: number }>`
  display: flex;
  flex-direction: column;

  color: ${({ theme, change }) =>
    change > 0 ? theme.colors.lightRed : change < 0 ? theme.colors.lightBlue : 'black'};
`;

const TradePrice = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 500;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.micro};
  }
`;

const ChangeWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;

  & > span:nth-child(1) {
    margin-right: 4px;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
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
