import styled from 'styled-components';
import { tradeVolume24hFormat } from '../../../utils';

interface HeaderRightProps {
  highPrice: number;
  lowPrice: number;
  accTradeVolume24h: number;
  accTradePrice24h: number;
  market: string;
}

export default function HeaderRight({
  highPrice,
  lowPrice,
  accTradeVolume24h,
  accTradePrice24h,
  market,
}: HeaderRightProps) {
  return (
    <Wrapper>
      <PriceA>
        <HP>
          고가 <span>{highPrice.toLocaleString()}</span>
        </HP>
        <LP>
          저가 <span>{lowPrice.toLocaleString()}</span>
        </LP>
      </PriceA>
      <PriceB>
        <ATV24H>
          거래량(24H)
          <span>
            {tradeVolume24hFormat(accTradeVolume24h)} <i>{market.substring(4)}</i>
          </span>
        </ATV24H>
        <ATP24H>
          거래대금(24H)
          <span>
            {Math.round(accTradePrice24h).toLocaleString()} <i>KRW</i>
          </span>
        </ATP24H>
      </PriceB>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
