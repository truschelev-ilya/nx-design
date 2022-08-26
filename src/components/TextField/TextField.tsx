import './TextField.css';

import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { IconCaretDown } from '../../icons/IconCaretDown/IconCaretDown';
import { IconCaretUp } from '../../icons/IconCaretUp/IconCaretUp';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';
import { FieldCaption } from '../FieldCaption/FieldCaption';
import { FieldLabel } from '../FieldLabel/FieldLabel';

import {
  getTypeForRender,
  sizeMap,
  TextFieldComponent,
  textFieldPropFormDefault,
  TextFieldProps,
  textFieldPropSizeDefault,
  textFieldPropViewDefault,
  textFieldPropWidthDefault,
} from './helpers';
import {IconCloseC} from "../../icons/IconCloseC/IconCloseC";
import {useFlag} from "../../hooks/useFlag/useFlag";
import {IconEyeInvisible} from "../../icons/IconEyeInvisible/IconEyeInvisible";
import {useMutableRef} from "../../hooks/useMutableRef/useMutableRef";
import {IconEye} from "../../icons/IconEye/IconEye";

export const COMPONENT_NAME = 'TextField' as const;
export const cnTextField = cn(COMPONENT_NAME);

export function TextFieldRender<TYPE extends string>(
  props: TextFieldProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) {
  const textFieldRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const {
    className,
    type = 'text',
    value,
    onChange,
    id,
    name,
    rows,
    cols,
    minRows,
    maxRows,
    inputRef: inputRefProp,
    maxLength,
    disabled,
    size = textFieldPropSizeDefault,
    view = textFieldPropViewDefault,
    form = textFieldPropFormDefault,
    state,
    status,
    width = textFieldPropWidthDefault,
    onBlur,
    onFocus,
    autoFocus = false,
    placeholder,
    leftSide,
    rightSide,
    autoComplete,
    withClearButton,
    max,
    min,
    readOnly,
    required,
    step = 1,
    tabIndex,
    ariaLabel,
    label,
    inputContainerRef,
    labelPosition = 'top',
    caption,
    iconSize: iconSizeProp,
    focused,
    onClick,
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, textFieldRef);

  const [focus, setFocus] = useState<boolean>(autoFocus);
  const textarea = type === 'textarea';
  const LeftIcon = leftSide;
  const RightIcon = rightSide;
  const leftSideIsString = typeof leftSide === 'string';
  const rightSideIsString = typeof rightSide === 'string';
  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);
  const [passwordVisible, setPasswordVisuble] = useFlag(false);

  const valueRef = useMutableRef(value);

  const Eye = passwordVisible ? IconEye : IconEyeInvisible;

  const handleEyeClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setPasswordVisuble.toogle();
    inputRef.current?.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    !disabled && onChange?.({ e, id, name, value: value || null });
  };

  const handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
    setFocus(false);
    onBlur?.(e);
  };

  const handleFocus: React.FocusEventHandler<HTMLElement> = (e) => {
    setFocus(true);
    onFocus?.(e);
  };

  const commonProps = {
    'className': cnTextField('Input'),
    'value': value || '',
    'onChange': handleChange,
    maxLength,
    disabled,
    'onBlur': handleBlur,
    'onFocus': handleFocus,
    autoFocus,
    placeholder,
    autoComplete,
    readOnly,
    required,
    tabIndex,
    name,
    'id': id ? id.toString() : '',
    'aria-label': ariaLabel,
  };

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    }
  }, []);

  const textareaProps = {
    rows,
    cols,
    minRows: minRows || rows,
    maxRows: maxRows || rows,
    inputRef: useForkRef([inputRef, inputRefProp]) as (node: HTMLTextAreaElement) => void,
  };

  const inputProps = {
    type: getTypeForRender(type, passwordVisible),
    max,
    min,
    step,
    ref: useForkRef([inputRef, inputRefProp]) as React.RefCallback<HTMLInputElement>,
  };

  const handleClear: (e: React.MouseEvent<HTMLButtonElement>) => void = (e) => {
    onChange?.({
      e,
      value: '',
    });
  };

  const changeNumberValue: (
    e: React.MouseEvent<HTMLButtonElement>,
    isIncrement?: boolean,
  ) => void = (e, isIncrement = true) => {
    let currentValue = value || 0;
    currentValue = isIncrement
      ? Number(currentValue) + Number(step)
      : Number(currentValue) - Number(step);
    onChange?.({
      e,
      value: currentValue.toFixed(
        Number(
          /* Необходимо для того, чтобы избежать ситуации, когда по нажатию
          на кнопку прибавляется число с погрешностью.
          Здесь мы берем разрядность дробной части шага и ограничиваем
          результирующее число этой разрядностью */
          Number(step)
            .toString()
            .split('.')[1]?.length,
        ) || 0,
      ),
    });
  };

  const rootProps = {
    // для того чтобы любые клики во внутренним элементам фокусили инпут
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      inputRef.current?.focus();
      onClick?.(e);
    },
  };

  useEffect(() => {
    if (type === 'password' && inputRef.current) {
      inputRef.current.selectionStart = valueRef.current?.length || 0;
    }
  }, [passwordVisible]);

  return (
    <div
      className={cnTextField({ labelPosition, size, view, width })}
      ref={useForkRef([ref, textFieldRef])}
      {...rootProps}
      {...otherProps}
    >
      {label && (
        <FieldLabel
          required={required}
          className={cnTextField('Label', { labelPosition })}
          size={size}
        >
          {label}
        </FieldLabel>
      )}
      <div className={cnTextField('Body')}>
        <div
          ref={inputContainerRef}
          className={cnTextField('InputContainer', {
            view,
            form,
            status: status || state,
            disabled,
            type,
            focus: focus || focused,
            withValue: !!value,
          }, [className])}
        >
          {LeftIcon && (
            <div
              className={cnTextField('Side', {
                position: 'left',
                type: leftSideIsString ? 'string' : 'icon',
              })}
              title={typeof leftSide === 'string' ? leftSide : undefined}
            >
              {leftSideIsString ? (
                leftSide
              ) : (
                <LeftIcon className={cnTextField('Icon')} size={iconSize} />
              )}
            </div>
          )}
          {textarea ? (
            <TextAreaAutoSize {...commonProps} {...textareaProps} />
          ) : (
            <input {...commonProps} {...inputProps} />
          )}

          {type === 'number' && (
            <div className={cnTextField('Counter')}>
              <button
                onClick={(e) => changeNumberValue(e, true)}
                type="button"
                className={cnTextField('CounterButton')}
              >
                <IconCaretUp size="xs" />
              </button>
              <button
                onClick={(e) => changeNumberValue(e, false)}
                type="button"
                className={cnTextField('CounterButton')}
              >
                <IconCaretDown size="xs" />
              </button>
            </div>
          )}

          {value && withClearButton && type !== 'number' && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleClear}
              className={cnTextField('ClearButton')}
            >
              <IconCloseC size="xs" className={cnTextField('ClearButtonIcon')} />
            </button>
          )}

          {type === 'password' && (
            <button className={cnTextField('ClearButton')} type="button" onClick={handleEyeClick}>
              <Eye className={cnTextField('Icon')} size={iconSize} />
            </button>
          )}

          {RightIcon && type !== 'number' && type !== 'password' && (
            <div
              className={cnTextField('Side', {
                position: 'right',
                type: rightSideIsString ? 'string' : 'icon',
              })}
              title={typeof rightSide === 'string' ? rightSide : undefined}
            >
              {rightSideIsString ? (
                rightSide
              ) : (
                <RightIcon className={cnTextField('Icon')} size={iconSize} />
              )}
            </div>
          )}
        </div>
        {caption && (
          <FieldCaption className={cnTextField('Caption')} status={status || state}>
            {caption}
          </FieldCaption>
        )}
      </div>
    </div>
  );
}

export const TextField = forwardRef(TextFieldRender) as TextFieldComponent;
export * from './helpers';
