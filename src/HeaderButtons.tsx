import {IconButton} from "./IconButton";
import * as React from "react";
import {Box} from "./Box";
import {Button} from "./Button";
import {Text} from "./Text";
import {BackButtonInterface, SearchButtonProps} from "./UnifiedCommon";
import {Unifier} from "./Unifier";

export class SearchButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <Box>
        <IconButton
          icon="search"
          prefix="fas"
          onClick={this.props.onClick}
          accessibilityLabel="search"
          iconColor={this.props.color || "white"}
        />
      </Box>
    );
  }
}

export class BackButton extends React.Component<BackButtonInterface, {}> {
  render() {
    return (
      <Box width={50} paddingX={3} justifyContent="center" alignItems="center">
        <IconButton
          prefix="fas"
          icon="chevron-left"
          size="md"
          onClick={() => this.props.onBack && this.props.onBack()}
          accessibilityLabel=""
          iconColor="white"
        />
      </Box>
    );
  }
}

export class FilterButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return <Button type="ghost" color="white" text="Filter" onClick={this.props.onClick} />;
  }
}

export class EditButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <IconButton
        icon="pen"
        prefix="fas"
        onClick={this.props.onClick}
        accessibilityLabel="edit"
        iconColor={this.props.color}
      />
    );
  }
}

export class UseButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <Button
        onClick={() => {
          Unifier.utils.haptic();
          this.props.onClick();
        }}
        text="Use"
      />
    );
  }
}

export class AddTabButton extends React.Component<SearchButtonProps, {}> {
  render() {
    return (
      <Box width={62} height={62} color="blue" onClick={this.props.onClick}>
        <Text color="darkGray">Add</Text>
      </Box>
    );
  }
}
