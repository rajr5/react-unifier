import React from "react";
import {Box} from "./Box";
import {Card} from "./Card";

export default {
  title: "Card",
  component: Card,
};

export const PlainCard = () => (
  <Box width="100%" height="100%" display="flex" direction="column" color="lightGray" padding={12}>
    <Card>
      <Box display="flex" direction="row" alignItems="center">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={50}
          height={50}
          rounding="circle"
          color="blue"
          marginRight={2}
        >
          <h2>JG</h2>
        </Box>
        <Box paddingX={2} direction="column">
          <div>
            <b>Josh Gachnang</b>
          </div>
          <div>joined 2 years ago</div>
        </Box>
      </Box>
    </Card>
  </Box>
);
