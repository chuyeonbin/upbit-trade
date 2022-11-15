import styled from 'styled-components';
import { TableCell } from '@mui/material';

export default function Inner1() {
  return (
    <Inner rowSpan={15} colSpan={2}>
      <dl>
        <dt>거래량</dt>
        <dd>8,615BTC</dd>
        <dt>거래 대금</dt>
        <dd>
          195,525<i>백만원</i>
          <em>(최근24시간)</em>
        </dd>
      </dl>
      <dl>
        <dt>52주 최고</dt>
        <dd>
          80,250,000<em>(2021.11.15)</em>
        </dd>
        <dt>52주 최저</dt>
        <dd>
          21,509,000
          <em>(2022.11.14)</em>
        </dd>
      </dl>
      <dl>
        <dt>전일 종가</dt>
        <dd>22,701,000</dd>
        <dt>당일 고가</dt>
        <dd>
          23,078,000
          <em>+1.66%</em>
        </dd>
        <dt>당일 저가</dt>
        <dd>
          22,530,000
          <em>-0.75%</em>
        </dd>
      </dl>
    </Inner>
  );
}

const Inner = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: bottom;
  }
`;
