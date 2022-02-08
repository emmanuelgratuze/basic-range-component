import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Rail = styled.div`
  width: 100%;
  height: 5px;
  background-color: #444444;
  border-radius: 0.4em;
`;

export const Handle = styled.div`
  position: absolute;
  margin-left: -7.5px;
  height: 15px;
  width: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;

  > div {
    width: 100%;
    height: 100%;
    background-color: #000000;
    border-radius: 1em;
    transform: scale(0.9);
    transition: transform 0.2s ease-out;
  }

  &:hover {
    cursor: grab;
    > div {
      transform: scale(1);
    }
  }
`;
