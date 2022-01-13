import React from "react";
import {Spinner} from "./Spinner";
import {Box} from "./Box";
import {storiesOf} from "@storybook/react-native";

storiesOf("Spinner", module)
  .add("Small", () => (
    <Box width="100%">
      <Spinner size="sm" />
    </Box>
  ))
  .add("Big", () => (
    <Box display="flex">
      <Spinner size="md" />
    </Box>
  ))
  .add("Dark", () => (
    <Box color="darkGray" paddingY={6}>
      <Spinner color="white" />
    </Box>
  ));
