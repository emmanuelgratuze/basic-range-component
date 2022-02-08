import styled from 'styled-components';

import EditableNumber from './EditableNumber';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const RangeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 300px;
  height: 20px;
  align-items: center;
`;

export const LeftEditableNumber = styled(EditableNumber)`
  text-align: right;
`;
