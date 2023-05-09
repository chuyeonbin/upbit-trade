import { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { searchMarketName } from '../../store/modules/coin';
import CoinItem from '../CoinItem';
import SearchCoin from './SearchCoin';

const tabList = ['원화', 'BTC', 'USDT', '보유', '관심'];
const tableHead = ['한글명', '현재가', '전일대비', '거래대금'];

export default function CoinList() {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const searchMarketList = useAppSelector((state) => state.coin.searchMarketList);

  const tickerList = useAppSelector((state) => state.coin.tickerList);

  const handleTabClick = useCallback((index: number) => setSelectedTab(index), []);

  const handleChangeSearchMarketList = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchMarketName({ word: value }));
  }, []);

  return (
    <Wrapper>
      <SearchCoin onChange={handleChangeSearchMarketList} />
      <TabList>
        {tabList.map((tab, index) => (
          <TabItem key={tab} onClick={() => handleTabClick(index)} selected={selectedTab === index}>
            <span>{tab}</span>
          </TabItem>
        ))}
      </TabList>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHead.map((value) => (
              <TableCell key={value}>{value}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {Object.keys(tickerList).length > 0 ? (
          <TableBody>
            {searchMarketList.map((marketData) => (
              <CoinItem
                key={marketData.market}
                code={marketData.market}
                koreanName={marketData.koreanName}
                englishName={marketData.englishName}
                coin={tickerList[marketData.market]}
              />
            ))}
          </TableBody>
        ) : null}
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: white;
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

const Table = styled.table`
  width: 100%;
  border-spacing: 0px;
  text-align: center;
`;

const TableHead = styled.thead`
  height: 30px;
  font-size: 11px;
  background: #f9fafc;
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;
`;

const TableRow = styled.tr``;

const TableCell = styled.td``;

const TableBody = styled.tbody``;
