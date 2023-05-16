import styled from 'styled-components';
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc';
import { dayToDayFormat, signedChangePriceFormat } from '../../../utils';

interface HeaderLeftProps {
  signedChangePrice: number;
  tradePrice: number;
  prevClosingPrice: number;
}

export default function HeaderLeft({
  signedChangePrice,
  tradePrice,
  prevClosingPrice,
}: HeaderLeftProps) {
  return (
    <Wrapper signedChangePrice={signedChangePrice}>
      <TradePrice>
        {tradePrice.toLocaleString()}
        <span>KRW</span>
      </TradePrice>
      <SignedChangePriceWrapper>
        <span>전일대비</span>
        <span>{dayToDayFormat(signedChangePrice, prevClosingPrice)}%</span>
        {signedChangePrice > 0 ? (
          <VscTriangleUp />
        ) : signedChangePrice < 0 ? (
          <VscTriangleDown />
        ) : null}
        <span>{signedChangePriceFormat(signedChangePrice)}</span>
      </SignedChangePriceWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ signedChangePrice: number }>`
  display: flex;
  flex-direction: column;

  color: ${({ theme, signedChangePrice }) =>
    signedChangePrice > 0
      ? theme.colors.lightRed
      : signedChangePrice < 0
      ? theme.colors.lightBlue
      : 'black'};
`;

const TradePrice = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 500;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.micro};
  }
`;

const SignedChangePriceWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;

  & > span:nth-child(1) {
    margin-right: 4px;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
