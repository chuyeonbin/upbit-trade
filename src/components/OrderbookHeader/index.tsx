import styled from 'styled-components';

export default function OrderbookHeader() {
  const tabList = ['일반호가', '누적호가', '호가주문'];
  return (
    <Wrapper>
      <Tabs>
        {tabList.map((tab, index) => (
          <Tab key={index}>{tab}</Tab>
        ))}
      </Tabs>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Tabs = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  flex-grow: 1;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-weight: 600;
`;
