import { TableCell, TableRow } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeSelectedCoin } from '../../store/modules/coin';
import { useAppSelector } from '../../store/store';
import Price from './Price';
import { dayToDayFormat, signedChangePriceFormat, tradingValueFormat } from '../../utils';

interface CoinItemProps {
  code: string;
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

export default memo(function CoinItem({ code, koreanName, englishName, coin }: CoinItemProps) {
  const dispatch = useDispatch();

  const selectedCoin = useAppSelector((state) => state.coin.selectedCoin);

  const handleCoinItemClick = useCallback(() => {
    if (selectedCoin.marketName !== koreanName) {
      dispatch(changeSelectedCoin({ marketName: koreanName, code }));
    }
  }, [selectedCoin]);

  return (
    <CoinRow onClick={handleCoinItemClick} change={coin.signedChangePrice} key={englishName}>
      <CoinCell sx={{ '&&': { p: '0 14px' } }}>
        <Star style={{ fontSize: '16px' }} />
      </CoinCell>
      <CoinCell>
        <p style={{ cursor: 'pointer' }}>{koreanName}</p>
        <p style={{ fontSize: '10px', color: '#666' }}>{code.substring(4)}/KRW</p>
      </CoinCell>
      <Price price={coin.tradePrice} />
      <CoinCell>
        <p>{dayToDayFormat(coin.signedChangePrice, coin.prevClosingPrice)}%</p>
        <p>{signedChangePriceFormat(coin.signedChangePrice)}</p>
      </CoinCell>
      <CoinCell>
        {tradingValueFormat(coin.accTradePrice24h)}
        <i>백만</i>
      </CoinCell>
    </CoinRow>
  );
});

const CoinCell = styled(TableCell)`
  height: 45px;

  && {
    padding: 0;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
  }

  & > i {
    color: #666;
  }
`;

const CoinRow = styled(TableRow)<{ change: number }>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  &:hover {
    background-color: #f4f5f8;
  }

  & > td {
    color: ${({ change, theme }) =>
      change > 0 ? theme.colors.lightRed : change < 0 ? theme.colors.lightBlue : 'black'};
    border-bottom: 0;
  }
`;

const Star = styled(StarIcon)`
  color: #ddd;
  cursor: pointer;
`;
