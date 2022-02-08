import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

function useElementSizeAndPosition() {
  const ref = useRef();
  const [sizeAndPosition, setSizeAndPosition] = useState({
    width: 0,
    height: 0
  });

  const handleSize = useCallback(() => {
    const elementBoudingRect = ref.current?.getBoundingClientRect();
    setSizeAndPosition({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
      x: elementBoudingRect.left,
      y: elementBoudingRect.top
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    element.addEventListener('resize', handleSize);

    return () => {
      element.removeEventListener('resize', handleSize);
    };
  });

  useEffect(() => {
    handleSize();
  }, [ref.current]);

  useLayoutEffect(() => {
    handleSize();
  }, [handleSize]);

  return [ref, sizeAndPosition];
}

export default useElementSizeAndPosition;
