import * as React from "react";
import {Box} from "./Box";
import {IconButton} from "./IconButton";
import {Text} from "./Text";
import {BannerProps, ButtonColor} from "./Common";
import {Unifier} from "./Unifier";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faTimesCircle, faArrowRight} from "@fortawesome/free-solid-svg-icons";

library.add(faTimesCircle);
library.add(faArrowRight);

interface BannerState {
  show: boolean;
}

function getKey(id: string) {
  return `@Pattern:${id}`;
}
export const hideBanner = (id: string) => {
  Unifier.storage.setItem(getKey(id), "true");
};

export class Banner extends React.Component<BannerProps, BannerState> {
  state = {show: false};

  async componentDidMount() {
    const seen = await Unifier.storage.getItem(getKey(this.props.id));
    this.setState({show: !seen});
  }

  dismiss = () => {
    hideBanner(this.props.id);
    this.setState({show: false});
  };

  render() {
    if (!this.state.show) {
      return null;
    }
    let type = this.props.type || "dismiss";

    if (type === "action" && !this.props.onClick) {
      console.warn("Banners with type action require an onClick property.");
    }
    const negativeMargin = (this.props.negativeXMargin || 0) * -4;

    return (
      <Box
        onClick={this.dismiss}
        paddingY={2}
        marginTop={3}
        marginBottom={3}
        color={this.props.color || "secondaryDark"}
        direction="row"
        rounding={this.props.shape}
        dangerouslySetInlineStyle={{
          __style: {
            marginLeft: negativeMargin,
            marginRight: negativeMargin,
          },
        }}
        width={Unifier.utils.dimensions().width || "100%"}
        paddingX={3}
        justifyContent="between"
      >
        <Box direction="column" justifyContent="center" alignItems="center" flex="shrink">
          <Box paddingY={1}>
            <Text align="center" color={this.props.textColor || "white"} weight="bold">
              {this.props.text}
            </Text>
          </Box>
          {this.props.subtext && (
            <Box paddingY={1}>
              <Text align="center" color={this.props.textColor || "white"}>
                {this.props.subtext}
              </Text>
            </Box>
          )}
        </Box>
        <Box display="block" width={40} alignItems="center" justifyContent="center">
          {type === "dismiss" && (
            <IconButton
              prefix="fas"
              icon="times-circle"
              // size="lg"
              onClick={() => this.dismiss()}
              accessibilityLabel=""
              iconColor={(this.props.textColor || "white") as ButtonColor}
            />
          )}
          {type === "action" && (
            <IconButton
              prefix="fas"
              icon="arrow-right"
              // size="lg"
              onClick={() => this.props.onClick && this.props.onClick()}
              accessibilityLabel=""
              iconColor={(this.props.textColor || "white") as ButtonColor}
            />
          )}
        </Box>
      </Box>
    );
  }
}
