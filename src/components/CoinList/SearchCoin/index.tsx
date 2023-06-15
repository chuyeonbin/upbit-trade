import { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { searchMarket } from '../../../store/modules/coin';
import { useDispatch } from 'react-redux';

export default function SearchCoin() {
  const dispatch = useDispatch();

  const handleChangeSearchMarket = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchMarket({ word: value }));
  }, []);

  return (
    <Wrapper>
      <Input placeholder='코인명 검색' onChange={handleChangeSearchMarket} />
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
