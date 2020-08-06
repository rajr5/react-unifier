import * as React from "react";
import PropTypes from "prop-types";
import Controller from "./Controller";

interface Props {
  anchor: HTMLElement | null | undefined;
  children?: React.ReactNode;
  color?: "blue" | "orange" | "red" | "white" | "darkGray";
  idealDirection?: "up" | "right" | "down" | "left";
  onDismiss: () => void;
  positionRelativeToAnchor?: boolean;
  shouldFocus?: boolean;
  showCaret?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

export default function Flyout(props: Props) {
  const {
    anchor,
    children,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    color = "white",
    shouldFocus = true,
    showCaret = false,
    size,
  } = props;

  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor={color}
      caret={showCaret}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      shouldFocus={shouldFocus}
      size={size}
    >
      {children}
    </Controller>
  );
}

Flyout.propTypes = {
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(["up", "right", "down", "left"]),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  color: PropTypes.oneOf(["blue", "orange", "red", "white", "darkGray"]),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]), // default: sm
  ]),
  showCaret: PropTypes.bool,
};
