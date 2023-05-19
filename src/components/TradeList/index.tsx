import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import TradeItem from '../TradeItem';

const tabList = ['체결', '일별'];

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const market = useAppSelector((state) => state.coin.selectedCoin.market);
  const trades = useAppSelector((state) => state.coin.tradeList);

  const handleTabClick = (index: number) => setSelectedTab(index);

  return (
    <Wrapper>
      <Tabs>
        {tabList.map((tab, index) => (
          <Tab key={tab} onClick={() => handleTabClick(index)} selected={selectedTab === index}>
            {tab}
          </Tab>
        ))}
      </Tabs>
      <TradeListContainer>
        <TradeListTable>
          <TradeListHead>
            <TradeListRow>
              <TradeListCell>체결시간</TradeListCell>
              <TradeListCell>체결가격(KRW)</TradeListCell>
              <TradeListCell>체결량({market.substring(4)})</TradeListCell>
              <TradeListCell>체결금액(KRW)</TradeListCell>
            </TradeListRow>
          </TradeListHead>
          <TradeListBody>
            {trades.length > 0
              ? trades.map((trade) => (
                  <TradeItem
                    key={trade.sequentialId}
                    trade={{
                      timestamp: trade.timestamp,
                      tradePrice: trade.tradePrice,
                      tradeVolume: trade.tradeVolume,
                      askBid: trade.askBid,
                    }}
                  />
                ))
              : null}
          </TradeListBody>
        </TradeListTable>
      </TradeListContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: white;
`;

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li<{ selected: boolean }>`
  flex-grow: 1;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-weight: 600;
  color: ${({ selected }) => (selected ? '#1976d2' : 'black')};
  border-bottom: ${({ selected }) => (selected ? '3px' : '1px')} solid
    ${({ selected }) => (selected ? '#1976d2' : '#d5d6dc')};
  cursor: pointer;
`;

const TradeListContainer = styled.div`
  height: 300px;
  overflow: scroll;
`;

const TradeListTable = styled.table`
  position: relative;
  width: 100%;
  border-spacing: 0px;
`;

const TradeListHead = styled.thead`
  position: sticky;
  top: 0;
  background: #f9fafc;
`;

const TradeListBody = styled.tbody``;

const TradeListRow = styled.tr`
  &:nth-of-type(even),
  & > th {
    background: #f9fafc;
    color: ${({ theme }) => theme.colors.darkGray};
    font-weight: 400;
  }

  & > th:nth-child(1) {
    width: 10%;
  }

  & > th:nth-child(2),
  & > th:nth-child(3),
  & > th:nth-child(4) {
    text-align: right;
    width: 30%;
  }

  & > th:nth-child(4) {
    padding-right: 12px;
  }
`;

const TradeListCell = styled.th`
  height: 30px;
  padding: 0;
  text-align: center;
  font-size: 11px;
`;
