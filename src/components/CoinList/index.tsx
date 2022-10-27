import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { dayToDayFormat, signedChangePriceFormat, tradingValueFormat } from '../../utils';

export default function CoinList() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const marketList = useAppSelector((state) => state.coin.marketList);

  const tickerList = useAppSelector((state) => state.coin.tickerList);

  const tabList = ['원화', 'BTC', 'USDT', '보유', '관심'];
  const tableHead = ['한글명', '현재가', '전일대비', '거래대금'];

  const handleTabClick = (index: number) => setSelectedTab(index);

  return (
    <Wrapper>
      <CoinSerach>
        <SearchInput placeholder='코인명/심볼검색' />
        <SearchIcon sx={{ fontSize: 26, cursor: 'pointer' }} color='primary' />
      </CoinSerach>
      <TabList>
        {tabList.map((tab, index) => (
          <TabItem key={tab} onClick={() => handleTabClick(index)} selected={selectedTab === index}>
            <a href='#'>{tab}</a>
          </TabItem>
        ))}
      </TabList>
      <CoinTable>
        <CoinHead>
          <TableRow>
            <TableCell sx={{ border: 0 }} />
            {tableHead.map((value) => (
              <TableCell key={value} sx={{ border: 0 }}>
                {value}
              </TableCell>
            ))}
          </TableRow>
        </CoinHead>
        {Object.keys(tickerList).length > 0 ? (
          <CoinBody>
            {marketList.map((value) => (
              <CoinRow
                change={tickerList[value.code].signedChangePrice}
                key={value.englishName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CoinCell sx={{ '&&': { p: '0 14px' } }}>
                  <Star style={{ fontSize: '16px' }} />
                </CoinCell>
                <CoinCell>
                  <p style={{ cursor: 'pointer' }}>{value.koreanName}</p>
                  <p style={{ fontSize: '10px', color: '#666' }}>{value.code.substring(4)}/KRW</p>
                </CoinCell>
                <CoinCell sx={{ fontWeight: 600 }}>
                  {tickerList[value.code].tradePrice.toLocaleString()}
                </CoinCell>
                <CoinCell>
                  <p>
                    {dayToDayFormat(
                      tickerList[value.code].signedChangePrice,
                      tickerList[value.code].prevClosingPrice,
                    )}
                    %
                  </p>
                  <p>{signedChangePriceFormat(tickerList[value.code].signedChangePrice)}</p>
                </CoinCell>
                <CoinCell style={{ fontSize: '12px' }}>
                  {tradingValueFormat(tickerList[value.code].accTradePrice24h)}
                  <i>백만</i>
                </CoinCell>
              </CoinRow>
            ))}
          </CoinBody>
        ) : (
          <></>
        )}
      </CoinTable>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 400px;
`;

const CoinSerach = styled.div`
  padding: 0.7rem;
  display: flex;
  border-bottom: 1px solid #d5d6dc;
`;

const SearchInput = styled.input`
  flex-grow: 1;
`;

const TabList = styled.ul`
  display: flex;
`;

const TabItem = styled.li<{ selected: boolean }>`
  height: 45px;
  flex-grow: 1;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  border-bottom: ${({ selected }) => (selected ? '3px' : '1px')} solid
    ${({ selected }) => (selected ? '#1976d2' : '#d5d6dc')};

  & > a {
    height: 42px;
    display: block;
    line-height: 42px;
    font-size: 14px;
  }

  &:hover {
    & > a {
      text-decoration: underline;
    }
  }

  & > a {
    color: ${({ selected }) => (selected ? '#1976d2' : 'black')};
  }
`;

const CoinTable = styled(Table)``;

const CoinHead = styled(TableHead)`
  height: 30px;
  background: #f9fafc;
  cursor: pointer;

  & > tr > th {
    padding: 0;
    color: #666;
    font-size: 12px;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  }
`;

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

const CoinBody = styled(TableBody)`
  & > tr > td:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > tr > td:nth-child(2) {
    color: black;
  }

  & > tr > td:nth-child(5) {
    color: black;
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
