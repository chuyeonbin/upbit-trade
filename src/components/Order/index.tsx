import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeOrderPrice } from '../../store/modules/coin';
import { useAppSelector } from '../../store/store';
import theme from '../../styles/theme';

const tabList = ['매수', '매도', '거래내역'];

export default function Order() {
  const dispatch = useDispatch();
  const orderCountRef = useRef<HTMLInputElement>(null);
  const totalPriceRef = useRef<HTMLInputElement>(null);
  const orderPrice = useAppSelector((state) => state.coin.orderPrice);
  const code = useAppSelector((state) => state.coin.selectedCoin.code);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [askBid, setAskBid] = useState('매수');

  const handleTabClick = (index: number, title: string) => {
    setSelectedTab(index);
    setAskBid(title);
  };

  const handleChangeOrderPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const orderPrice = Number(e.target.value.replace(/[^0-9]/g, ''));
    dispatch(changeOrderPrice({ orderPrice }));
  };

  const handleChangeOrderCount = () => {
    if (orderCountRef.current && totalPriceRef.current) {
      if (!isNaN(Number(orderCountRef.current.value))) {
        totalPriceRef.current.value = `${Number(orderCountRef.current.value) * orderPrice}`;
      }
    }
  };

  const handleChangeTotalPrice = () => {
    if (orderCountRef.current && totalPriceRef.current) {
      if (!isNaN(Number(totalPriceRef.current.value))) {
        orderCountRef.current.value = `${(Number(totalPriceRef.current.value) / orderPrice).toFixed(
          8,
        )}`;
      }
    }
  };

  useEffect(() => {
    if (orderCountRef.current && totalPriceRef.current) {
      orderCountRef.current.value = '';
      totalPriceRef.current.value = '';
    }
  }, [orderPrice]);

  return (
    <Wrapper>
      <TabList>
        {tabList.map((tab, index) => (
          <TabItem key={tab} selected={selectedTab === index} askbid={tab}>
            <a
              href='#'
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const target = e.target as HTMLLIElement;
                handleTabClick(index, target.title);
              }}
              title={tab}
            >
              {tab}
            </a>
          </TabItem>
        ))}
      </TabList>
      <Dl>
        <Dt>주문가능</Dt>
        <Dd>
          <strong>0</strong>
          <i>{askBid === '매수' ? 'KRW' : 'BTC'}</i>
        </Dd>
        <Dt>
          {askBid}가격<i>(KRW)</i>
        </Dt>
        <Dd>
          <InputWrapper>
            <Input
              type='text'
              value={orderPrice.toLocaleString()}
              onChange={handleChangeOrderPrice}
            />
            <ButtonWrapper>
              <Button>-</Button>
              <Button>+</Button>
            </ButtonWrapper>
          </InputWrapper>
        </Dd>
        <Dt>
          주문수량<i>({code.substring(4)})</i>
        </Dt>
        <Dd>
          <Input
            type='text'
            placeholder='0'
            ref={orderCountRef}
            onChange={handleChangeOrderCount}
          />
        </Dd>
        <Dt>
          주문총액<i>(KRW)</i>
        </Dt>
        <Dd>
          <Input
            type='text'
            placeholder='0'
            ref={totalPriceRef}
            onChange={handleChangeTotalPrice}
          />
        </Dd>
        <AskBidButton askbid={askBid}>{askBid === '매수' ? '매수' : '매도'}</AskBidButton>
      </Dl>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-left: 5px;
  width: 50%;
  background-color: white;
`;

const TabList = styled.ul`
  display: flex;
`;

const TabItem = styled.li<{ selected: boolean; askbid: string }>`
  height: 45px;
  flex-grow: 1;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  border-bottom: ${({ theme, selected }) => (selected ? '3px' : '1px')} solid
    ${({ selected, askbid }) =>
      askbid === '매수' && selected
        ? '#c84a31'
        : askbid === '매도' && selected
        ? '#1976d2'
        : theme.colors.lightGray};

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
    color: ${({ selected, askbid }) =>
      askbid === '매수' && selected
        ? '#c84a31'
        : askbid === '매도' && selected
        ? '#1976d2'
        : 'black'};
  }
`;

const Dl = styled.dl`
  padding: 1rem;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const Dt = styled.dt`
  margin-bottom: 10px;
  width: 25%;
  height: 38px;
  float: left;
  clear: both;
  line-height: 38px;
  font-size: ${({ theme }) => theme.fontSize.micro};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};

  & > i {
    margin-left: 2px;
    font-size: 10px;
  }
`;

const Dd = styled.dd`
  margin-bottom: 10px;
  width: 60%;
  height: 38px;
  line-height: 38px;
  float: right;
  text-align: right;

  & > i {
    margin-left: 2px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: 0 8px;
  width: 100%;
  height: 38px;
  font-size: ${({ theme }) => theme.fontSize.small};
  text-align: right;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const ButtonWrapper = styled.div`
  display: flex;
  height: 38px;

  & > button:nth-child(1) {
    border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  }

  & > button:nth-child(2) {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
  }
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  font-size: ${({ theme }) => theme.fontSize.regular};
  color: ${({ theme }) => theme.colors.darkGray};
  background: #f9fafc;
`;

const AskBidButton = styled.button<{ askbid: string }>`
  padding: 1rem;
  width: 100%;
  color: white;
  font-weight: bold;
  border-radius: 1px;
  background: ${({ theme, askbid }) =>
    askbid === '매수' ? theme.colors.lightRed : theme.colors.lightBlue}; ;
`;
