import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import TradeItem from '../TradeItem';

const tabList = ['체결', '일별'];

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

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
      <Table stickyHeader>
        <TableHead>
          <TradeListRow>
            <TradeListCell>체결시간</TradeListCell>
            <TradeListCell>체결가격(KRW)</TradeListCell>
            <TradeListCell>체결량(BTC)</TradeListCell>
            <TradeListCell>체결금액(KRW)</TradeListCell>
          </TradeListRow>
        </TableHead>
        <TableBody>
          <TradeItem />
          <TradeItem />
          <TradeItem />
          <TradeItem />
          <TradeItem />
          <TradeItem />
        </TableBody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 900px;
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
