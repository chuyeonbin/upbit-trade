import styled from 'styled-components';
import { TableCell } from '@mui/material';
import { useAppSelector } from '../../../../store/store';

export default function Inner1() {
  const selectedCoin = useAppSelector((state) => state.coin.selectedCoin);

  return (
    <Inner rowSpan={15} colSpan={2}>
      <Dl>
        <Dt>거래량</Dt>
        <Dd>
          {Number(selectedCoin.accTradeVolume24h.toFixed()).toLocaleString()}
          <I>{selectedCoin.code.substring(4)}</I>
        </Dd>
        <Dt>거래 대금</Dt>
        <Dd>
          195,525<I>백만원</I>
          <Em>(최근24시간)</Em>
        </Dd>
      </Dl>
      <Dl>
        <Dt>52주 최고</Dt>
        <Up>
          80,250,000<Date>(2021.11.15)</Date>
        </Up>
        <Dt>52주 최저</Dt>
        <Down>
          21,509,000
          <Date>(2022.11.14)</Date>
        </Down>
      </Dl>
      <Dl>
        <Dt>전일 종가</Dt>
        <Dd>22,701,000</Dd>
        <Dt>당일 고가</Dt>
        <Up>
          23,078,000
          <Em>+1.66%</Em>
        </Up>
        <Dt>당일 저가</Dt>
        <Down>
          22,530,000
          <Em>-0.75%</Em>
        </Down>
      </Dl>
    </Inner>
  );
}

const Inner = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: bottom;
    border-bottom: none;
  }
`;

const Dl = styled.dl`
  margin: 0 10px;
  padding: 10px 0;
  overflow: hidden;
  font-size: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  &:last-child {
    border-bottom: none;
  }
`;

const Dt = styled.dt`
  float: left;
  clear: both;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Dd = styled.dd`
  float: right;
`;

const Up = styled(Dd)`
  color: ${({ theme }) => theme.colors.lightRed};
  & > em {
    color: ${({ theme }) => theme.colors.lightRed};
  }
`;

const Down = styled(Dd)`
  color: ${({ theme }) => theme.colors.lightBlue};
  & > em {
    color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

const I = styled.i`
  font-style: normal;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Em = styled.em`
  display: block;
  text-align: right;
  color: ${({ theme }) => theme.colors.darkGray};
  font-style: normal;
`;

const Date = styled(Em)`
  && {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
