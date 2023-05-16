import styled from 'styled-components';

interface HeaderTitleProps {
  market: string;
  koreanName: string;
}

export default function HeaderTitle({ market, koreanName }: HeaderTitleProps) {
  const logoUrl = `https://static.upbit.com/logos/${market.substring(4)}.png`;

  return (
    <Wrapper>
      <Logo src={logoUrl} />
      <Name>{koreanName}</Name>
      <MarketCode>{market.substring(4)}/KRW</MarketCode>
    </Wrapper>
  );
}

const Wrapper = styled.div`
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

const Name = styled.h4`
  margin-left: 12px;
`;

const MarketCode = styled.p`
  margin-top: 7px;
  margin-left: 3px;
  font-size: 12px;
  color: #666;
`;
