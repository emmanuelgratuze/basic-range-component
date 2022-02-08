import React, { useState } from 'react';
import Range from 'components/Range';

function StepRangeExample() {
  const [values, setValues] = useState();

  return (
    <div>
      <Range
        values={values}
        stepValues={[0.5, 0.6, 4, 10, 23]}
        onChange={setValues}
        valueSuffix="€"
        areNumbersEditable={false}
      />
    </div>
  );
}

export default StepRangeExample;
