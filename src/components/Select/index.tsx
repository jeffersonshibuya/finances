import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useField } from '@unform/core';

import ReactSelect, {
  Props as ReactSelectProps,
  OptionTypeBase,
} from 'react-select';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error, SelectStyled } from './styles';

interface Props extends ReactSelectProps {
  name: string;
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
      clearValue: ref => {
        ref.select.clearValue();
      },
      getValue: rest.isMulti
        ? ref =>
            ref.state.value?.map((option: OptionTypeBase) => option.value) || []
        : ref => (ref.state.value ? ref.state.value.value : ''),
    });
  }, [fieldName, registerField, rest.isMulti]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container>
      <SelectStyled ref={selectRef} defaultValue={defaultValue} {...rest} />
      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Select;
