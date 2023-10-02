import React from 'react';

import type { Props, GroupBase } from 'react-select';
import Select from 'react-select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import StyledSelectContainer from './Select.styles';

const SelectWrapper = <Option, Group extends GroupBase<Option>, IsMulti extends boolean = false>(
  props: Props<Option, IsMulti, Group> & {
    className?: string;
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    error?: boolean;
  },
) => {
  return (
    <StyledSelectContainer className={props.className}>
      {props.label && (
        <InputLabel className="select__label" error={props.error}>
          {props.label}
        </InputLabel>
      )}

      <Select
        {...props}
        className={undefined}
        classNamePrefix="select"
        placeholder={props.placeholder || ''}
      />

      {props.helperText && (
        <FormHelperText error={props.error}>
          {props.helperText}
        </FormHelperText>
      )}
    </StyledSelectContainer>
  );
};

export default SelectWrapper;
