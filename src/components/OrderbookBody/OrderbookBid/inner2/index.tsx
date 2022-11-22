import { TableCell } from '@mui/material';
import styled from 'styled-components';

export default function inner2() {
  return (
    <Inner2 rowSpan={15} colSpan={2}>
      <Wrapper>
        <Dl>
          <dt>체결강도</dt>
          <dd>51.25%</dd>
        </Dl>
        <Table>
          <TableHead>
            <Tr>
              <Th>체결가</Th>
              <Th>체결량</Th>
            </Tr>
          </TableHead>
          <tbody>
            <Tr>
              <Td>22,000,000,000</Td>
              <Td>1.243</Td>
            </Tr>
            <Tr>
              <Td>22,000,000,000</Td>
              <Td>1.243</Td>
            </Tr>
            <Tr>
              <Td>22,000,000,000</Td>
              <Td>1.243</Td>
            </Tr>
          </tbody>
        </Table>
      </Wrapper>
    </Inner2>
  );
}

const Inner2 = styled(TableCell)`
  && {
    padding: 0;
    vertical-align: top;
    font-size: ${({ theme }) => theme.fontSize.microSmall};
  }
`;

const Wrapper = styled.div`
  height: 405px;
  overflow: hidden;
`;

const Dl = styled.dl`
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const TableHead = styled.thead`
  position: relative;
  color: #666;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 10px;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.colors.lightGray};
    content: '';
  }
`;

const Tr = styled.tr``;

const Th = styled.th`
  height: 30px;
  text-align: center;
  font-weight: normal;
  background-color: #f9fafc;
`;

const Td = styled.td`
  padding: 4px;
  width: 50%;
  text-align: right;
`;
