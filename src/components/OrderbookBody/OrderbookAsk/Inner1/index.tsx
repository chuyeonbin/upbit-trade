import styled from 'styled-components';
import { TableCell } from '@mui/material';
import { useAppSelector } from '../../../../store/store';
import { dayToDayFormat } from '../../../../utils';

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
          {Number((selectedCoin.accTradePrice24h / 1000000).toFixed()).toLocaleString()}
          <I>백만원</I>
          <Em>(최근24시간)</Em>
        </Dd>
      </Dl>
      <Dl>
        <Dt>52주 최고</Dt>
        <Up>
          {selectedCoin.high52WeekPrice.toLocaleString()}
          <Date>({selectedCoin.high52WeekDate.replaceAll('-', '.')})</Date>
        </Up>
        <Dt>52주 최저</Dt>
        <Down>
          {selectedCoin.low52WeekPrice.toLocaleString()}
          <Date>({selectedCoin.low52WeekDate.replaceAll('-', '.')})</Date>
        </Down>
      </Dl>
      <Dl>
        <Dt>전일 종가</Dt>
        <Dd>{selectedCoin.prevClosingPrice.toLocaleString()}</Dd>
        <Dt>당일 고가</Dt>
        <Up>
          {selectedCoin.highPrice.toLocaleString()}
          <Em>
            {dayToDayFormat(
              selectedCoin.highPrice - selectedCoin.prevClosingPrice,
              selectedCoin.prevClosingPrice,
            )}
            %
          </Em>
        </Up>
        <Dt>당일 저가</Dt>
        <Down>
          {selectedCoin.lowPrice.toLocaleString()}
          <Em>
            {dayToDayFormat(
              selectedCoin.lowPrice - selectedCoin.prevClosingPrice,
              selectedCoin.prevClosingPrice,
            )}
            %
          </Em>
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
  text-align: right;
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
