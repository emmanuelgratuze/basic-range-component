import { useCallback } from 'react';
import useElementSizeAndPosition from 'hooks/useElementSizeAndPosition';

// This hook is responsible for converting value to position and vice versa
const useSlider = ({ min, max, values, stepValues, interval }) => {
  const [sliderRef, sliderSizeAndPosition] = useElementSizeAndPosition();
  const calculatePositionFromValue = useCallback(
    (value) => {
      const total = max - min;
      return ((value - min) / total) * sliderSizeAndPosition.width;
    },
    [min, max, sliderSizeAndPosition]
  );

  const calculateValueFromPosition = useCallback(
    (index, xPosition) => {
      // Get the value from the position
      const relativePosition = xPosition - sliderSizeAndPosition.x;
      const total = max - min;
      const newValue = (relativePosition / sliderSizeAndPosition.width) * total + min;

      // Keep the value in correct range
      const allowedMin = index <= 0 ? min : values[index - 1];
      const allowedMax = index >= values.length - 1 ? max : values[index + 1];
      const newValueInRange = Math.min(Math.max(allowedMin, newValue), allowedMax);

      if (stepValues) {
        const closestValue = stepValues.reduce((closestVal, value) => {
          return Math.abs(newValueInRange - value) < Math.abs(newValueInRange - closestVal)
            ? value
            : closestVal;
        }, stepValues[0]);

        return closestValue;
      }

      // Round the value depending on interval
      return Math.round(newValueInRange / interval) * interval;
    },
    [max, min, sliderSizeAndPosition, values, interval, stepValues]
  );

  return {
    sliderRef,
    calculatePositionFromValue,
    calculateValueFromPosition
  };
};

export default useSlider;
