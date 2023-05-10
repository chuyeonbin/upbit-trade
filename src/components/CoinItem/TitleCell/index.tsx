import styled from 'styled-components';

interface TitleCell {
  koreanName: string;
  englishName: string;
  market: string;
}

export default function TitleCell({ koreanName, market }: TitleCell) {
  return (
    <Wrapper>
      <CoinName>{koreanName}</CoinName>
      <MarketCode>{market.substring(4)}/KRW</MarketCode>
    </Wrapper>
  );
}

const Wrapper = styled.td``;

const CoinName = styled.strong`
  cursor: pointer;
  color: black;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const MarketCode = styled.p`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.darkGray};
`;
