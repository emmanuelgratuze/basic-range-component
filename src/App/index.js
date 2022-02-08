import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Page from 'components/Page';
import NormalRangeExample from '../examples/NormalRangeExample';
import StepRangeExample from '../examples/StepRangeExample';

import { GlobalStyles } from './styles';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />}>
            <Route path="normal-range-example" element={<NormalRangeExample />} />
            <Route path="step-range-example" element={<StepRangeExample />} />
            <Route index element={<NormalRangeExample />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
