import { useState } from 'react';
import styled from 'styled-components';

export default function TradeList() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabClick = (index: number) => setSelectedTab(index);

  const tabList = ['체결', '일별'];
  return (
    <Wrapper>
      <Tabs>
        {tabList.map((tab, index) => (
          <Tab key={tab} onClick={() => handleTabClick(index)} selected={selectedTab === index}>
            {tab}
          </Tab>
        ))}
      </Tabs>
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
