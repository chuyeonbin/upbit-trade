import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchCoinProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchCoin({ onChange }: SearchCoinProps) {
  return (
    <Wrapper>
      <Input placeholder='코인명 검색' onChange={onChange} />
      <AiOutlineSearch />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

  & > svg {
    font-size: 26px;
    color: ${({ theme }) => theme.colors.lightBlue};
    cursor: pointer;
  }
`;

const Input = styled.input`
  flex-grow: 1;
`;
