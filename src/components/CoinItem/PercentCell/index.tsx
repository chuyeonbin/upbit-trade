import styled from 'styled-components';
import { dayToDayFormat, signedChangePriceFormat } from '../../../utils';

interface PercentCellProps {
  signedChangPrice: number;
  prevClosingPrice: number;
}

export default function PercentCell({ prevClosingPrice, signedChangPrice }: PercentCellProps) {
  const percent = dayToDayFormat(signedChangPrice, prevClosingPrice);
  const value = signedChangePriceFormat(signedChangPrice);

  return (
    <Wrapper>
      <p>{percent}</p>
      <p>{value}</p>
    </Wrapper>
  );
}

const Wrapper = styled.td``;
