import React, { useState } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Range from './Range';

const RangeWithState = (props) => {
  // eslint-disable-next-line react/prop-types
  const [values, setValues] = useState(props.values);
  return <Range {...props} values={values} onChange={setValues} />;
};

const editRangeValueThroughInput = (inputIndex, newValue) => {
  fireEvent.click(screen.getAllByTestId(`value-display-text`)[inputIndex]);
  expect(screen.queryAllByTestId(`value-display-text`)).toHaveLength(1);

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('number')).toBeInTheDocument();

  fireEvent.change(screen.getByRole('number'), { target: { value: newValue } });
  fireEvent.click(screen.getByRole('button'));
  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.queryAllByRole('number')).toHaveLength(0);
};

describe('<Range />', () => {
  it('Renders <Range /> component correctly', () => {
    render(<RangeWithState min={0} max={10} />);

    expect(screen.getAllByRole('slider', { valuenow: 0 })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('slider', { valuenow: 10 })[1]).toBeInTheDocument();
    expect(screen.queryAllByRole('slider')).toHaveLength(2);
    expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('0');
    expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('10');
    expect(screen.queryByRole('number')).not.toBeInTheDocument();
  });

  it('Renders <Range /> with default values', () => {
    render(<RangeWithState min={0} max={10} values={[2, 8]} />);

    expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('2');
    expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('8');
  });

  it('Renders <Range /> with values suffix', () => {
    render(<RangeWithState min={0} max={10} values={[3, 9]} valueSuffix="€" />);

    expect(screen.getAllByRole('slider', { valuenow: 3 })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('slider', { valuenow: 9 })[1]).toBeInTheDocument();
    expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('3 €');
    expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('9 €');
  });

  it('Renders <Range /> with values suffix', () => {
    render(<RangeWithState min={0} max={10} values={[4, 6]} valueSuffix="$" />);

    expect(screen.getAllByRole('slider', { valuenow: 4 })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('slider', { valuenow: 6 })[1]).toBeInTheDocument();
    expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('4 $');
    expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('6 $');
  });

  it('Renders <Range /> with no max or min value but default values', () => {
    render(<RangeWithState values={[2, 8]} />);

    expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('2');
    expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('8');
  });

  it('Render <Range /> with stepValues', () => {
    render(<RangeWithState stepValues={[1, 2, 3, 10]} />);

    expect(screen.getAllByRole('slider', { valuenow: 1 })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('slider', { valuenow: 10 })[1]).toBeInTheDocument();
    expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('1');
    expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('10');
  });

  describe('When modifying values', () => {
    it('Renders <Range /> and update the start value through the input', () => {
      render(<RangeWithState min={0} max={10} values={[2, 8]} />);

      expect(screen.queryAllByRole('number')).toHaveLength(0);
      expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('2');
      expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('8');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();

      editRangeValueThroughInput(0, '3');

      expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('3');
      expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('8');
      expect(screen.getAllByRole('slider', { valuenow: 3 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    });

    it('Renders <Range /> and update the end value through the input', () => {
      render(<RangeWithState min={0} max={10} values={[2, 8]} />);

      expect(screen.queryAllByRole('number')).toHaveLength(0);
      expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('2');
      expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('8');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();

      editRangeValueThroughInput(1, '10');

      expect(screen.getAllByTestId('value-display-text')[0]).toHaveTextContent('2');
      expect(screen.getAllByTestId('value-display-text')[1]).toHaveTextContent('10');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 10 })[1]).toBeInTheDocument();
    });

    it('Renders <Range /> and try to define the start value upper than the max', () => {
      render(<RangeWithState min={0} max={10} values={[2, 8]} />);

      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
      editRangeValueThroughInput(0, '11');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    });

    it('Renders <Range /> and try to define the start value lower than the min', () => {
      render(<RangeWithState min={0} max={10} values={[2, 8]} />);

      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[0]).toBeInTheDocument();
      editRangeValueThroughInput(0, '-2');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    });

    it('Renders <Range /> and try to define the end value upper than the max', () => {
      render(<RangeWithState min={0} max={10} values={[2, 8]} />);

      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[0]).toBeInTheDocument();
      editRangeValueThroughInput(1, '11');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    });

    it('Renders <Range /> and try to define the max value lower than the min', () => {
      render(<RangeWithState min={0} max={10} values={[2, 8]} />);

      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[0]).toBeInTheDocument();
      editRangeValueThroughInput(1, '-2');
      expect(screen.getAllByRole('slider', { valuenow: 2 })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('slider', { valuenow: 8 })[1]).toBeInTheDocument();
    });
  });

  describe('When numbers are not editable directly through the inputs', () => {
    it('Renders <Range /> and should not show the start input when the number is clicked', () => {
      render(<Range values={[2, 8]} areNumbersEditable={false} />);

      fireEvent.click(screen.getAllByTestId(`value-display-text`)[0]);
      expect(screen.queryAllByTestId(`value-display-text`)).toHaveLength(2);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('number')).not.toBeInTheDocument();
    });

    it('Renders <Range /> and should not show the end input when the number is clicked', () => {
      render(<Range values={[2, 8]} areNumbersEditable={false} />);

      fireEvent.click(screen.getAllByTestId(`value-display-text`)[1]);
      expect(screen.queryAllByTestId(`value-display-text`)).toHaveLength(2);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('number')).not.toBeInTheDocument();
    });
  });
});
