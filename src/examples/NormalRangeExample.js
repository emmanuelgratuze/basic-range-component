import React, { useState } from 'react';
import Range from 'components/Range';

function NormalRangeExample() {
  const [values, setValues] = useState();

  return (
    <div>
      <Range values={values} min={0} max={200} onChange={setValues} valueSuffix="€" />
    </div>
  );
}

export default NormalRangeExample;
