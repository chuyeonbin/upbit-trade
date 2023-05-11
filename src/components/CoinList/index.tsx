import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import CoinItem from '../CoinItem';
import SearchCoin from './SearchCoin';

const tabList = ['원화', 'BTC', 'USDT', '보유', '관심'];
const tableHead = ['한글명', '현재가', '전일대비', '거래대금'];

export default function CoinList() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const searchMarketList = useAppSelector((state) => state.coin.searchMarketList);

  const tickerList = useAppSelector((state) => state.coin.tickerList);

  const handleTabClick = useCallback((index: number) => setSelectedTab(index), []);

  return (
    <Wrapper>
      <SearchCoin />
      <TabList>
        {tabList.map((tab, index) => (
          <TabItem key={tab} onClick={() => handleTabClick(index)} selected={selectedTab === index}>
            <span>{tab}</span>
          </TabItem>
        ))}
      </TabList>
      <Table>
        <TableHead>
          <tr>
            <td />
            {tableHead.map((value) => (
              <td key={value}>{value}</td>
            ))}
          </tr>
        </TableHead>
        {Object.keys(tickerList).length > 0 ? (
          <tbody>
            {searchMarketList.map((marketData) => (
              <CoinItem
                key={marketData.market}
                market={marketData.market}
                koreanName={marketData.koreanName}
                englishName={marketData.englishName}
                coin={tickerList[marketData.market]}
              />
            ))}
          </tbody>
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
