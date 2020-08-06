import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const formElement = require("./FormElement.module.css");
import FormErrorMessage from "./FormErrorMessage";
import FormHelperText from "./FormHelperText";
import FormLabel from "./FormLabel";
const styles = require("./TextArea.module.css");

interface Props {
  errorMessage?: string;
  disabled?: boolean;
  hasError?: boolean;
  helperText?: string;
  id: string;
  label?: string;
  name?: string;
  onBlur?: (arg0: {event: React.FocusEvent<HTMLTextAreaElement>; value: string}) => void;
  onChange: (arg0: {event: React.SyntheticEvent<HTMLTextAreaElement>; value: string}) => void;
  onFocus?: (arg0: {event: React.FocusEvent<HTMLTextAreaElement>; value: string}) => void;
  onKeyDown?: (arg0: {event: React.KeyboardEvent<HTMLTextAreaElement>; value: string}) => void;
  placeholder?: string;
  rows?: number;
  /* default: 3 */
  value?: string;
}

interface State {
  focused: boolean;
}

export default class TextArea extends React.Component<Props, State> {
  // that reach into this component and use this instance variable
  textarea: HTMLElement | null | undefined;

  static propTypes = {
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    helperText: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    hasError: false,
    rows: 3,
  };

  state = {
    focused: false,
  };

  setTextAreaRef = (ref: HTMLTextAreaElement | null | undefined) => {
    this.textarea = ref;
  };

  handleChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const {onChange} = this.props;
    onChange({event, value: event.currentTarget.value});
  };

  handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const {onBlur} = this.props;
    if (onBlur) {
      onBlur({event, value: event.currentTarget.value});
    }
  };

  handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const {onFocus} = this.props;
    if (onFocus) {
      onFocus({event, value: event.currentTarget.value});
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const {onKeyDown} = this.props;
    if (onKeyDown) {
      onKeyDown({event, value: event.currentTarget.value});
    }
  };

  render() {
    const {
      disabled,
      errorMessage,
      hasError,
      helperText,
      id,
      label,
      name,
      placeholder,
      rows,
      value,
    } = this.props;

    const {focused} = this.state;

    const classes = classnames(
      styles.textArea,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      hasError || errorMessage ? formElement.errored : formElement.normal
    );

    return (
      <span>
        {label && <FormLabel id={id} label={label} />}
        <textarea
          aria-describedby={errorMessage && focused ? `${id}-error` : undefined}
          aria-invalid={errorMessage || hasError ? "true" : "false"}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          ref={this.setTextAreaRef}
          rows={rows}
          value={value}
        />
        {helperText && !errorMessage ? <FormHelperText text={helperText} /> : null}
        {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
      </span>
    );
  }
}
