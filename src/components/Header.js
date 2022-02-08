import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav`
  background-color: #333333;
  padding: 0 1em;
  a {
    color: white;
    text-decoration: none;
    display: inline-block;
    padding: 0.5em 2em 0.5em 0;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Link to="/normal-range-example">Normal Range Slider</Link>
      {'   '}
      <Link to="/step-range-example">Step Range Slider</Link>
    </Wrapper>
  );
}

export default Header;
