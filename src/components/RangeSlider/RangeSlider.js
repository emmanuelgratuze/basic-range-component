import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Handle, Rail, Wrapper } from './styles';
import useSlider from './hooks/useSlider';

import { pauseEvent } from 'utils/events';
function RangeSlider({ values, min: minProp, max: maxProp, onChange, interval, stepValues }) {
  const min = useMemo(() => {
    if (stepValues?.length > 0) return stepValues[0];
    if (typeof minProp === 'undefined' && values?.length) {
      return values[0];
    }
    return minProp;
  }, [minProp, stepValues, values]);

  const max = useMemo(() => {
    if (stepValues?.length > 1) return stepValues[stepValues.length - 1];
    if (typeof maxProp === 'undefined' && values?.length > 1) {
      return values[values.length - 1];
    }
    return maxProp;
  }, [maxProp, stepValues, values]);

  const [activeHandleIndex, setActiveHandleIndex] = useState(null);
  const { sliderRef, calculatePositionFromValue, calculateValueFromPosition } = useSlider({
    min,
    max,
    values,
    stepValues,
    interval
  });

  // Event listeners
  const handleMouseUp = useCallback(() => setActiveHandleIndex(null), []);
  const handleMouseDown = useCallback((index) => setActiveHandleIndex(index), []);
  const handleMouseMove = useCallback(
    (e) => {
      pauseEvent(e);
      if (activeHandleIndex === null) return;

      const newValue = calculateValueFromPosition(activeHandleIndex, e.clientX);
      const newValues = [...values];
      newValues[activeHandleIndex] = newValue;

      onChange && onChange(newValues);
    },
    [activeHandleIndex, onChange, values, calculateValueFromPosition]
  );

  // Effects
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  // MouseMove listener
  const mouseMoveListener = useRef();
  useEffect(() => {
    if (activeHandleIndex !== null) {
      mouseMoveListener.current = handleMouseMove;
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', mouseMoveListener.current);
    }
  }, [activeHandleIndex]);

  // If values not defined, set the state min and max by default
  useEffect(() => {
    if (!values || values?.length < 2) {
      onChange && onChange([min, max]);
    }
  }, [values]);

  const handlesProps = useMemo(() => {
    if (!values || !values.length) return [];
    return values.map((value, index) => ({
      index,
      value,
      leftPosition: calculatePositionFromValue(value)
    }));
  }, [values, calculatePositionFromValue]);

  return (
    <Wrapper ref={sliderRef}>
      <Rail />
      {handlesProps.map(({ index, value, leftPosition }) => (
        <Handle
          onMouseDown={() => handleMouseDown(index)}
          key={index}
          role="slider"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          style={{
            transform: `translateX(${leftPosition}px)`
          }}
        >
          <div />
        </Handle>
      ))}
    </Wrapper>
  );
}

RangeSlider.defaultProps = {
  interval: 1
};

RangeSlider.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number,
  max: PropTypes.number,
  stepValues: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  interval: PropTypes.number
};

export default RangeSlider;
