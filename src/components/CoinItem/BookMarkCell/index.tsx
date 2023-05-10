import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';

export default function BookMarkCell() {
  return (
    <Wrapper>
      <AiFillStar />
    </Wrapper>
  );
}

const Wrapper = styled.td`
  padding: 0 14px;

  & > svg {
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;
