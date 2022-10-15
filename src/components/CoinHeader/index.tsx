import styled from 'styled-components';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function CoinHeader() {
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <Logo src='https://static.upbit.com/logos/BTC.png' />
        <KoreanName>비트코인</KoreanName>
        <EnglishName>BTC/KRW</EnglishName>
      </TitleWrapper>
      <HeaderBody>
        <TradePriceWrapper>
          <TradePrice>
            28,300,000<span>KRW</span>
          </TradePrice>
          <ChangeWrapper>
            <span>전일대비</span>
            <span>+1.54%</span>
            <ArrowDropUpIcon />
            <span>430,000</span>
          </ChangeWrapper>
        </TradePriceWrapper>
        <PriceWrapper>
          <PriceA>
            <HP>
              고가 <span>28,690,000</span>
            </HP>
            <LP>
              저가 <span>27,700,000</span>
            </LP>
          </PriceA>
          <PriceB>
            <ATV24H>
              거래량(24H){' '}
              <span>
                9,323.920 <i>BTC</i>
              </span>
            </ATV24H>
            <ATP24H>
              거래대금(24H){' '}
              <span>
                255,007,507,144 <i>KRW</i>
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

const TradePriceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.lightRed};
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
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const ATP24H = styled.p`
  padding-top: 11px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;

  & > span > i {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
