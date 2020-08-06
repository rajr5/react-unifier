import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const layout = require("./Layout.module.css");
const styles = require("./SearchField.module.css");
import Box from "./Box";
import Icon from "./Icon";

interface Props {
  accessibilityLabel: string;
  autoComplete?: "on" | "off" | "username" | "name";
  id: string;
  onBlur?: (arg0: {event: React.SyntheticEvent<HTMLInputElement>}) => void;
  onChange: (arg0: {value: string; syntheticEvent: React.SyntheticEvent<HTMLInputElement>}) => void;
  onFocus?: (arg0: {value: string; syntheticEvent: React.SyntheticEvent<HTMLInputElement>}) => void;
  placeholder?: string;
  size?: "md" | "lg";
  value?: string;
}

interface State {
  focused: boolean;
  hovered: boolean;
}

export default class SearchField extends React.Component<Props, State> {
  static propTypes = {
    accessibilityLabel: PropTypes.string.isRequired,
    autoComplete: PropTypes.oneOf(["on", "off", "username", "name"]),
    id: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(["md", "lg"]),
    value: PropTypes.string,
  };

  state = {
    focused: false,
    hovered: false,
  };

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    onChange({
      value: event.currentTarget.value,
      syntheticEvent: event,
    });
  };

  handleClear = (event: any) => {
    const {onChange} = this.props;
    onChange({value: "", syntheticEvent: event});
  };

  handleMouseEnter = () => this.setState({hovered: true});

  handleMouseLeave = () => this.setState({hovered: false});

  handleFocus = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {onFocus} = this.props;
    this.setState({focused: true});

    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        syntheticEvent: event,
      });
    }
  };

  handleBlur = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {onBlur} = this.props;
    this.setState({focused: false});

    if (onBlur) {
      onBlur({event});
    }
  };

  render() {
    const {accessibilityLabel, autoComplete, id, placeholder, size = "md", value} = this.props;

    const {focused, hovered} = this.state;

    // This mirrors the built in browser behavior. If there's a value, show the
    // clear button if you're hovering or if you've focused on the field
    const showClear = (focused || hovered) && value && value.length > 0;

    const className = classnames(styles.input, size === "md" ? layout.medium : layout.large);

    return (
      <Box
        display="flex"
        position="relative"
        alignItems="center"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              pointerEvents: "none",
              // Added the following lines for Safari support
              top: "50%",
              transform: "translateY(-50%)",
            },
          }}
          position="absolute"
          left
          paddingX={4}
        >
          <Icon icon="search" accessibilityLabel="" />
        </Box>
        <input
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className={className}
          id={id}
          onChange={this.handleChange}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />
        {showClear && (
          <Box position="absolute" right top>
            <button className={styles.clear} onClick={this.handleClear} tabIndex={-1} type="button">
              <Icon icon="clear" accessibilityLabel="" />
            </button>
          </Box>
        )}
      </Box>
    );
  }
}
