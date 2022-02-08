import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import EditableNumber from './EditableNumber';
import RangeSlider from '../RangeSlider';

import { Wrapper, RangeWrapper, LeftEditableNumber } from './styles';
function Range({ values, min, max, onChange, valueSuffix, stepValues, areNumbersEditable, step }) {
  const isNewValueValid = useCallback(
    (index, newValue) => {
      // Check step values
      if (stepValues !== null && !stepValues.includes(newValue)) return false;

      // Check values bounds and order
      const isLowerThanPreviousNumbers = values.slice(0, index).some((value) => newValue < value);
      const isGreaterThanNextNumbers = values
        .slice(index + 1, values.length)
        .some((value) => newValue > value);
      const isGreaterThanMaxNumber = newValue > max;
      const isLowerThanMinNumber = newValue < min;

      return (
        !isLowerThanPreviousNumbers &&
        !isLowerThanMinNumber &&
        !isGreaterThanNextNumbers &&
        !isGreaterThanMaxNumber
      );
    },
    [stepValues, values, max, min]
  );

  const editValueAtIndex = (index, newValue) => {
    if (!isNewValueValid(index, newValue)) return;

    const newValues = [...values];
    newValues[index] = newValue;
    onChange && onChange(newValues);
  };

  return (
    <Wrapper>
      <LeftEditableNumber
        value={values.length ? values[0] : null}
        onEdit={(newValue) => editValueAtIndex(0, newValue)}
        valueSuffix={valueSuffix}
        isEditable={areNumbersEditable}
      />
      <RangeWrapper>
        <RangeSlider
          values={values}
          min={min}
          max={max}
          onChange={onChange}
          stepValues={stepValues}
          step={step}
        />
      </RangeWrapper>
      <EditableNumber
        value={values.length > 1 ? values[1] : null}
        onEdit={(newValue) => editValueAtIndex(1, newValue)}
        valueSuffix={valueSuffix}
        isEditable={areNumbersEditable}
      />
    </Wrapper>
  );
}

Range.defaultProps = {
  values: [],
  stepValues: null,
  valueSuffix: '',
  areNumbersEditable: true,
  step: 1
};

Range.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number,
  max: PropTypes.number,
  stepValues: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  valueSuffix: PropTypes.string,
  areNumbersEditable: PropTypes.bool,
  step: PropTypes.number
};

export default Range;
