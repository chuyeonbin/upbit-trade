import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import TradeItem from '../TradeItem';

const tabList = ['체결', '일별'];

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const code = useAppSelector((state) => state.coin.selectedCoin.code);
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
      <Paper sx={{ overflow: 'hidden', boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: 300, minHeight: 300 }}>
          <Table stickyHeader>
            <TableHead>
              <TradeListRow>
                <TradeListCell>체결시간</TradeListCell>
                <TradeListCell>체결가격(KRW)</TradeListCell>
                <TradeListCell>체결량({code.substring(4)})</TradeListCell>
                <TradeListCell>체결금액(KRW)</TradeListCell>
              </TradeListRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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

const TradeListRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even), & > th': {
    backgroundColor: '#f9fafc',
    color: theme.colors.darkGray,
  },
  '& > th:nth-child(1)': {
    width: '10%',
  },
  '& > th:nth-child(2), & > th:nth-child(3), & > th:nth-child(4)': {
    textAlign: 'right',
    width: '30%',
  },
  '& > th:nth-child(4)': {
    paddingRight: '12px',
  },
}));

const TradeListCell = styled(TableCell)`
  height: 30px;

  && {
    padding: 0;
    text-align: center;
    font-size: 11px;
  }
`;
