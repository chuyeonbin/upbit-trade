import { TableCell, TableRow } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useCallback } from 'react';
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
}

export default function CoinItem({ code, koreanName, englishName }: CoinItemProps) {
  const dispatch = useDispatch();

  const tickerList = useAppSelector((state) => state.coin.tickerList);

  const selectedCoin = useAppSelector((state) => state.coin.selectedCoin);

  const handleCoinItemClick = useCallback(
    (marketName: string, code: string) => {
      if (selectedCoin.marketName !== marketName) {
        dispatch(changeSelectedCoin({ marketName, code }));
      }
    },
    [selectedCoin],
  );

  return (
    <CoinRow
      onClick={() => handleCoinItemClick(koreanName, code)}
      change={tickerList[code].signedChangePrice}
      key={englishName}
    >
      <CoinCell sx={{ '&&': { p: '0 14px' } }}>
        <Star style={{ fontSize: '16px' }} />
      </CoinCell>
      <CoinCell>
        <p style={{ cursor: 'pointer' }}>{koreanName}</p>
        <p style={{ fontSize: '10px', color: '#666' }}>{code.substring(4)}/KRW</p>
      </CoinCell>
      <Price price={tickerList[code].tradePrice} />
      <CoinCell>
        <p>
          {dayToDayFormat(tickerList[code].signedChangePrice, tickerList[code].prevClosingPrice)}%
        </p>
        <p>{signedChangePriceFormat(tickerList[code].signedChangePrice)}</p>
      </CoinCell>
      <CoinCell>
        {tradingValueFormat(tickerList[code].accTradePrice24h)}
        <i>백만</i>
      </CoinCell>
    </CoinRow>
  );
}

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
