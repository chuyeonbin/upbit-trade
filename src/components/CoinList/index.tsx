import { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { searchMarketName } from '../../store/modules/coin';
import CoinItem from '../CoinItem';

const tabList = ['원화', 'BTC', 'USDT', '보유', '관심'];
const tableHead = ['한글명', '현재가', '전일대비', '거래대금'];

export default function CoinList() {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const searchMarketList = useAppSelector((state) => state.coin.searchMarketList);

  const tickerList = useAppSelector((state) => state.coin.tickerList);

  const handleTabClick = useCallback((index: number) => setSelectedTab(index), []);

  const handleChangeSearchMarketList = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(searchMarketName({ word: target.value }));
  }, []);

  return (
    <Wrapper>
      <CoinSerach>
        <SearchInput placeholder='코인명 검색' onChange={handleChangeSearchMarketList} />
        <SearchIcon sx={{ fontSize: 26, cursor: 'pointer' }} color='primary' />
      </CoinSerach>
      <TabList>
        {tabList.map((tab, index) => (
          <TabItem key={tab} onClick={() => handleTabClick(index)} selected={selectedTab === index}>
            <span>{tab}</span>
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
            {searchMarketList.map((value) => (
              <CoinItem
                key={value.code}
                code={value.code}
                koreanName={value.koreanName}
                englishName={value.englishName}
                coin={tickerList[value.code]}
              />
            ))}
          </CoinBody>
        ) : null}
      </CoinTable>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: white;
`;

const CoinSerach = styled.div`
  padding: 0.5rem;
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

  & > span {
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
const CoinBody = styled(TableBody)`
  & > tr > td:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > tr > td:nth-child(2) {
    color: black;
  }

  & > tr > td:nth-child(3) {
    position: relative;
    font-weight: 600;
  }

  & > tr > td:nth-child(5) {
    color: black;
  }
`;
