import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.span`
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
`;
const Wrapper = styled.div`
  width: 5rem;
  display: flex;
  align-items: center;
`;

function EditableNumber({ value, onEdit, onStartEditing, className, valueSuffix, isEditable }) {
  const [inputValue, setInputValue] = useState(null);

  const endEditing = () => {
    setInputValue(null);
    const newValue = Number(inputValue);
    if (!Number.isNaN(newValue)) {
      onEdit(Number(newValue));
    }
  };

  const startEditing = () => {
    if (onStartEditing) onStartEditing();
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue(null);
  }, [value]);

  useEffect(() => {
    if (!isEditable) {
      setInputValue(null);
    }
  }, [isEditable]);

  if (value === null) {
    return null;
  }

  return (
    <Wrapper className={className}>
      {inputValue === null ? (
        <Text onClick={isEditable ? startEditing : undefined} data-testid="value-display-text">
          {`${value}${valueSuffix && ` ${valueSuffix}`}`}
        </Text>
      ) : (
        <>
          <Input
            role="number"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button onClick={endEditing}>Ok</button>
        </>
      )}
    </Wrapper>
  );
}

EditableNumber.defaultProps = {
  valueSuffix: '',
  isEditable: true,
  value: null
};

EditableNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onEdit: PropTypes.func.isRequired,
  className: PropTypes.string,
  onStartEditing: PropTypes.func,
  valueSuffix: PropTypes.string,
  isEditable: PropTypes.bool
};

export default EditableNumber;
