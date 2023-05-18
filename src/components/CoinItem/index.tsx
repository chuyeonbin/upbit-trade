import { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeSelectedCoin } from '../../store/modules/coin';
import { useAppSelector } from '../../store/store';
import BookMarkCell from './BookMarkCell';
import TitleCell from './TitleCell';
import TradePriceCell from './TradePriceCell';
import PercentCell from './PercentCell';
import TradingValueCell from './TradingValueCell';

interface CoinItemProps {
  market: string;
  koreanName: string;
  englishName: string;
  coin: {
    tradePrice: number;
    changePrice: number;
    accTradePrice24h: number;
    prevClosingPrice: number;
    signedChangePrice: number;
  };
}

export default memo(function CoinItem({ market, koreanName, englishName, coin }: CoinItemProps) {
  const dispatch = useDispatch();

  const marketName = useAppSelector((state) => state.coin.selectedCoin.marketName);

  const handleCoinItemClick = useCallback(() => {
    if (marketName !== koreanName) {
      dispatch(changeSelectedCoin({ marketName: koreanName, market }));
    }
  }, [marketName]);

  return (
    <Wrapper
      onClick={handleCoinItemClick}
      selected={marketName === koreanName}
      change={coin.signedChangePrice}
      key={market}
    >
      <BookMarkCell />
      <TitleCell koreanName={koreanName} englishName={englishName} market={market} />
      <TradePriceCell tradePrice={coin.tradePrice} />
      <PercentCell
        signedChangPrice={coin.signedChangePrice}
        prevClosingPrice={coin.prevClosingPrice}
      />
      <TradingValueCell accTradePrice24h={coin.accTradePrice24h} />
    </Wrapper>
  );
});

const Wrapper = styled.tr<{ change: number; selected: boolean }>`
  height: 45px;
  background-color: ${({ selected }) => (selected ? '#f4f5f8' : 'none')};
  border-bottom: 1px solid green;

  &:hover {
    background-color: #f4f5f8;
  }

  & > td {
    font-size: 12px;
    color: ${({ change, theme }) =>
      change > 0 ? theme.colors.lightRed : change < 0 ? theme.colors.lightBlue : 'black'};
    border-bottom: 1px solid #f1f1f4;
  }
`;
