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
      <TradePriceWrapper>
        <TradePrice>
          28,300,000<span>KRW</span>
        </TradePrice>
        <ChangeWrapper>
          <span>전일대비</span>
          <span>+1.54%</span>
          <ArrowDropDownIcon />
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
            거래량(24H) <span>9,323.920</span> <i>BTC</i>
          </ATV24H>
          <ATP24H>
            거래대금(24H) <span>255,007,507,144</span> <i>KRW</i>
          </ATP24H>
        </PriceB>
      </PriceWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.article``;

const TitleWrapper = styled.div``;

const Logo = styled.img``;

const KoreanName = styled.h4``;

const EnglishName = styled.p``;

const TradePriceWrapper = styled.div``;

const TradePrice = styled.h3``;

const ChangeWrapper = styled.div``;

const PriceWrapper = styled.div``;

const PriceA = styled.div``;

const HP = styled.p``;

const LP = styled.p``;

const PriceB = styled.div``;

const ATV24H = styled.p``;

const ATP24H = styled.p``;
