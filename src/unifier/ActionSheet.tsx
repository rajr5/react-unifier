import React, {Component, createRef} from "react";
import {
  Animated,
  Dimensions,
  findNodeHandle,
  FlatList,
  Keyboard,
  KeyboardEvent,
  LayoutChangeEvent,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from "react-native";

export type ActionSheetProps = {
  ref?: React.MutableRefObject<{
    /**
     * Open or close the ActionSheet.
     */
    setModalVisible(visible?: boolean): void;

    /**
     * Open the Action Sheet.
     */
    show(): void;

    /**
     * Close the ActionSheet.
     */
    hide(): void;

    /**
     * Attach this to any child ScrollView Component's onScrollEndDrag,
     * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
     * closing and bouncing back properly.
     */
    handleChildScrollEnd(): void;

    /**
     * Snap ActionSheet to given offset
     */
    snapToOffset(offset: number): void;
  }>;
  /**
      * Animate the opening and closing of ActionSheet.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `true`
      */
  animated?: boolean;

  /**
      * Use if you want to show the ActionSheet Partially on Opening. **Requires `gestureEnabled=true`**
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default:`1`
      */

  initialOffsetFromBottom?: number;

  /**
      * When touch ends and user has not moved farther from the set springOffset, the ActionSheet will return to previous position.
  
 | Type | Required |
 | ---- | -------- |
 | number | no |
  
 Default: `50`
      */
  springOffset?: number;
  /**
      * Add elevation to the ActionSheet container. 
  
 | Type | Required |
 | ---- | -------- |
 | number | no |
  
 Default: `0`
  
 #
      */
  elevation?: number;

  /**
      * Color of the gestureEnabled Indicator.
  
 | Type | Required |
 | ---- | -------- |
 | string | no |
  
 Default: `"#f0f0f0"`
      */
  indicatorColor?: string;

  /**
      * Normally when the ActionSheet is fully opened, a small portion from the bottom is hidden by default. Use this prop if you want the ActionSheet to hover over the bottom of screen and not hide a little behind it.
  
 | Type | Required |
 | ---- | -------- |
 | number | no |
  
 Default:`0`
      */
  extraScroll?: number;
  /**
      * Color of the overlay/backdrop.
  
 | Type | Required |
 | ---- | -------- |
 | string | no |
  
 Default: `"black"`
      */
  overlayColor?: string;

  /**
      * Keep the header always visible even when gestures are disabled.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `false`
      */
  headerAlwaysVisible?: boolean;

  /**
      * Delay draw of ActionSheet on open for android.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `false`
      */

  delayActionSheetDraw?: boolean;

  /**
      * Delay draw of ActionSheet on open for android time.
  
 | Type | Required |
 | ---- | -------- |
 | number (ms) | no |
  
 Default: `50`
      */

  delayActionSheetDrawTime?: number;

  /**
      * Your custom header component. Using this will hide the default indicator.
  
 | Type | Required |
 | ---- | -------- |
 | React.Component | no |
      */
  CustomHeaderComponent?: React.ReactNode;

  /**
      * Any custom styles for the container. 
  
 | Type | Required |
 | ---- | -------- |
 | Object | no |
      */
  containerStyle?: ViewStyle;

  /**
      * Control closing ActionSheet by touching on backdrop.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `true`
      */
  closeOnTouchBackdrop?: boolean;

  /**
      * Speed of opening animation. Higher means the ActionSheet will open more quickly.
  
 | Type | Required |
 | ---- | -------- |
 | number | no |
  
 Default: `12`
      */
  openAnimationSpeed?: number;
  /**
      * Duration of closing animation.
  
 | Type | Required |
 | ---- | -------- |
 | number | no |
  
 Default: `300`
      */
  closeAnimationDuration?: number;
  /**
      * 
 How much you want the ActionSheet to bounce when it is opened. 
  
 | Type | Required |
 | ---- | -------- |
 | number | no |
  
 Default: `8`
      */
  bounciness?: number;

  /**
      * Will the ActionSheet close on `hardwareBackPress` event.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `true`
      */
  closeOnPressBack?: boolean;
  /**
      * Default opacity of the overlay/backdrop.
  
 | Type | Required |
 | ---- | -------- |
 | number 0 - 1 | no |
  
 Default: `0.3`
      */
  defaultOverlayOpacity?: number;

  /**
      * Enables gesture control of ActionSheet
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `false`
      */
  gestureEnabled?: boolean;

  /**
      * Bounces the ActionSheet on open.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `false`
      */
  bounceOnOpen?: boolean;

  /**
      * Setting the keyboard persistance of the ScrollView component, should be one of "never", "always", or "handled"
  
 | Type | Required |
 | ---- | -------- |
 | string | no |
  
 Default: `"never"`
      */
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";

  /**
      * Determine whether the modal should go under the system statusbar.
  
 | Type | Required |
 | ---- | -------- |
 | boolean | no |
  
 Default: `true`
      */
  statusBarTranslucent?: boolean;

  /**
      * Prevent ActionSheet from closing on 
      * gesture or tapping on backdrop. 
      * Instead snap it to `bottomOffset` location
      * 
      * 
       * | Type | Required |
 | ---- | -------- |
 | boolean | no |
       */
  closable?: boolean;

  /**
     * Allow ActionSheet to draw under the StatusBar. 
     * This is enabled by default.
     * 
     * 
      * | Type | Required |
 | ---- | -------- |
 | boolean | no |
 Default: `true`
      */
  drawUnderStatusBar?: boolean;

  /**
      * Snap ActionSheet to this location if `closable` is set to false;
      * 
      * 
       * | Type | Required |
 | ---- | -------- |
 | number | no |
       */

  bottomOffset?: number;

  /**
     * Change how ActionSheet behaves when keyboard is opened.
     * 
     * 
      * | Type | Required |
 | ---- | -------- |
 | "padding" | "position" | no |
 Default:`padding`
      */

  keyboardMode?: "padding" | "position";

  /**
   * Test ID for unit testing
   */
  testID?: string;

  /**
      * 
 Event called when the ActionSheet closes.
  
  
 * | Type | Required |
 | ---- | -------- |
 | function | no |
  
  
 #
      */

  onClose?: () => void;

  /**
      * An event called when the ActionSheet Opens.
  
 | Type | Required |
 | ---- | -------- |
 | function | no |
      */
  onOpen?: () => void;

  /**
   * Event called when position of ActionSheet changes.
   */
  onPositionChanged?: (hasReachedTop: boolean) => void;
};

export const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    alignSelf: "center",
  },
  safearea: {
    position: "absolute",
    top: 999999,
    left: 999999,
  },
  indicator: {
    height: 6,
    width: 45,
    borderRadius: 100,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    alignSelf: "center",
  },
  parentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export function getDeviceHeight(statusBarTranslucent: boolean | undefined): number {
  let height = Dimensions.get("window").height;

  if (Platform.OS === "android" && !statusBarTranslucent) {
    return StatusBar.currentHeight ? height - StatusBar.currentHeight : height;
  }

  return height;
}

export const getElevation = (elevation?: number) => {
  if (!elevation) {
    return {};
  }
  return {
    elevation,
    shadowColor: "black",
    shadowOffset: {width: 0.3 * elevation, height: 0.5 * elevation},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * elevation,
  };
};

export const SUPPORTED_ORIENTATIONS: (
  | "portrait"
  | "portrait-upside-down"
  | "landscape"
  | "landscape-left"
  | "landscape-right"
)[] = ["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"];

export const waitAsync = (ms: number): Promise<null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

let safeAreaInnerHeight = 0;
const dummyData = ["dummy"];
let safeAreaPaddingTop = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
let calculatedDeviceHeight = Dimensions.get("window").height;

type State = {
  modalVisible: boolean;
  scrollable: boolean;
  layoutHasCalled: boolean;
  keyboard: boolean;
  deviceHeight: number;
  deviceWidth: number;
  portrait: boolean;
  safeAreaInnerHeight: number;
  paddingTop: number;
};

const defaultProps = {
  animated: true,
  closeOnPressBack: true,
  bounciness: 8,
  extraScroll: 0,
  closeAnimationDuration: 300,
  delayActionSheetDrawTime: 0,
  openAnimationSpeed: 12,
  springOffset: 100,
  elevation: 5,
  initialOffsetFromBottom: 1,
  indicatorColor: "#f0f0f0",
  defaultOverlayOpacity: 0.3,
  overlayColor: "black",
  closable: true,
  bottomOffset: 0,
  closeOnTouchBackdrop: true,
  drawUnderStatusBar: true,
  statusBarTranslucent: true,
  keyboardMode: "padding",
  gestureEnabled: false,
};

type Props = Partial<typeof defaultProps> & ActionSheetProps;

export class ActionSheet extends Component<Props, State, any> {
  static defaultProps = defaultProps;

  actionSheetHeight = 0;
  prevScroll = 0;
  timeout: any | null = null;
  offsetY = 0;
  currentOffsetFromBottom = 0;
  scrollAnimationEndValue = 0;

  hasBounced = false;
  layoutHasCalled = false;
  isClosing = false;
  isRecoiling = false;
  isReachedTop = false;
  deviceLayoutCalled = false;

  scrollViewRef: React.RefObject<any>;
  safeAreaViewRef: React.RefObject<any>;

  transformValue: Animated.Value;
  opacityValue: Animated.Value;
  borderRadius: Animated.Value;
  underlayTranslateY: Animated.Value;
  underlayScale: Animated.Value;
  indicatorTranslateY: Animated.Value;

  constructor(props: ActionSheetProps) {
    super(props);
    this.state = {
      modalVisible: false,
      scrollable: false,
      layoutHasCalled: false,
      keyboard: false,
      deviceHeight: calculatedDeviceHeight || getDeviceHeight(this.props.statusBarTranslucent),
      deviceWidth: Dimensions.get("window").width,
      portrait: true,
      safeAreaInnerHeight,
      paddingTop: safeAreaPaddingTop,
    };

    this.actionSheetHeight = 0;
    this.prevScroll = 0;
    this.scrollAnimationEndValue = 0;
    this.hasBounced = false;
    this.scrollViewRef = createRef();
    this.layoutHasCalled = false;
    this.isClosing = false;
    this.isRecoiling = false;
    this.offsetY = 0;
    this.safeAreaViewRef = createRef();
    this.transformValue = new Animated.Value(0);
    this.opacityValue = new Animated.Value(0);
    this.borderRadius = new Animated.Value(10);
    this.currentOffsetFromBottom = this.props.initialOffsetFromBottom as number;
    this.underlayTranslateY = new Animated.Value(100);
    this.underlayScale = new Animated.Value(1);
    this.indicatorTranslateY = new Animated.Value(-this.state.paddingTop | 0);
    this.isReachedTop = false;
    this.deviceLayoutCalled = false;
    this.timeout = null;
  }

  /**
   * Snap ActionSheet to Offset
   */

  snapToOffset = (offset: number) => {
    let correction = this.state.deviceHeight * 0.15;
    let extraScroll = this.props.extraScroll || 0;
    let scrollOffset = this.props.gestureEnabled
      ? offset + correction + extraScroll
      : offset + correction + extraScroll;
    this.currentOffsetFromBottom = offset / this.actionSheetHeight;
    this._scrollTo(scrollOffset);
    this.updateActionSheetPosition(scrollOffset);
  };
  // Open the ActionSheet
  show = () => {
    this.setModalVisible(true);
  };

  // Close the ActionSheet
  hide = () => {
    this.setModalVisible(false);
  };

  /**
   * Open/Close the ActionSheet
   */
  setModalVisible = (visible: boolean) => {
    let modalVisible = this.state.modalVisible;
    if (visible !== undefined) {
      if (modalVisible === visible) {
        return;
      }
      modalVisible = !visible;
    }

    if (!modalVisible) {
      this.setState({
        modalVisible: true,
        scrollable: this.props.gestureEnabled || false,
      });
    } else {
      this._hideModal();
    }
  };

  _hideAnimation() {
    let {
      animated,
      closeAnimationDuration,
      bottomOffset,
      initialOffsetFromBottom,
      extraScroll,
      closable,
    } = this.props;

    Animated.parallel([
      Animated.timing(this.opacityValue, {
        toValue: closable ? 0 : 1,
        duration: animated ? closeAnimationDuration : 1,
        useNativeDriver: true,
      }),
      Animated.timing(this.transformValue, {
        toValue: closable ? this.actionSheetHeight * 2 : 0,
        duration: animated ? closeAnimationDuration : 1,
        useNativeDriver: true,
      }),
    ]).start();

    waitAsync((closeAnimationDuration as number) / 1.5).then(() => {
      if (!closable) {
        if (bottomOffset && bottomOffset > 0) {
          this.snapToOffset(bottomOffset);
        } else {
          this._scrollTo(
            ((this.actionSheetHeight * (initialOffsetFromBottom || 0)) as number) +
              this.state.deviceHeight * 0.1 +
              (extraScroll ?? 0),
            true
          );
          this.currentOffsetFromBottom = initialOffsetFromBottom as number;
        }

        this.isClosing = false;
      } else {
        this._scrollTo(0, false);
        this.currentOffsetFromBottom = initialOffsetFromBottom as number;
        this.setState(
          {
            modalVisible: !closable,
          },
          () => {
            this.isClosing = false;
            this.isReachedTop = false;
            this.props.onPositionChanged && this.props.onPositionChanged(false);
            this.indicatorTranslateY.setValue(-this.state.paddingTop);
            this.layoutHasCalled = false;
            this.deviceLayoutCalled = false;
            this.props.onClose && this.props.onClose();
          }
        );
      }
    });
  }

  _hideModal = () => {
    if (this.isClosing) return;
    this.isClosing = true;
    this._hideAnimation();
  };

  measure = async (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        UIManager.measureInWindow(
          this.safeAreaViewRef.current._nativeTag,
          (x, y, width, height) => {
            safeAreaPaddingTop = height;
            resolve(height === 0 ? 20 : height);
          }
        );
      }, 100);
    });
  };

  _showModal = async (event: LayoutChangeEvent) => {
    let {gestureEnabled, delayActionSheetDraw, delayActionSheetDrawTime} = this.props;

    if (!event?.nativeEvent) return;
    let height = event.nativeEvent.layout.height;
    if (this.layoutHasCalled) {
      this.actionSheetHeight = height;
      this._returnToPrevScrollPosition(height);
      return;
    } else {
      this.layoutHasCalled = true;
      this.actionSheetHeight = height;
      let scrollOffset = this.getInitialScrollPosition();
      this.isRecoiling = false;
      if (Platform.OS === "ios") {
        await waitAsync(delayActionSheetDrawTime as number);
      } else {
        if (delayActionSheetDraw) {
          await waitAsync(delayActionSheetDrawTime as number);
        }
      }
      this._scrollTo(scrollOffset, false);
      this.prevScroll = scrollOffset;
      if (Platform.OS === "ios") {
        await waitAsync(delayActionSheetDrawTime ?? 0 / 2);
      } else {
        if (delayActionSheetDraw) {
          await waitAsync(delayActionSheetDrawTime ?? 0 / 2);
        }
      }
      this._openAnimation(scrollOffset);
      this.underlayScale.setValue(1);
      this.underlayTranslateY.setValue(100);
      if (!gestureEnabled) {
        this.props.onPositionChanged && this.props.onPositionChanged(true);
      }
      this.updateActionSheetPosition(scrollOffset);
    }
  };

  _openAnimation = (scrollOffset: number) => {
    let {bounciness, bounceOnOpen, animated, openAnimationSpeed} = this.props;

    if (animated) {
      this.transformValue.setValue(scrollOffset);
      Animated.parallel([
        Animated.spring(this.transformValue, {
          toValue: 0,
          bounciness: bounceOnOpen ? bounciness : 1,
          speed: openAnimationSpeed,
          useNativeDriver: true,
        }),
        Animated.timing(this.opacityValue, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      this.opacityValue.setValue(1);
    }
  };

  _onScrollBegin = async () => {};
  _onScrollBeginDrag = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let verticalOffset = event.nativeEvent.contentOffset.y;
    this.prevScroll = verticalOffset;
  };

  _applyHeightLimiter() {
    if (this.actionSheetHeight > this.state.deviceHeight) {
      this.actionSheetHeight =
        (this.actionSheetHeight - (this.actionSheetHeight - this.state.deviceHeight)) * 1;
    }
  }

  _onScrollEnd = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let {springOffset, extraScroll} = this.props;
    let verticalOffset = event.nativeEvent.contentOffset.y;

    let correction = this.state.deviceHeight * 0.15;
    if (this.isRecoiling) return;

    if (this.prevScroll < verticalOffset) {
      if (verticalOffset - this.prevScroll > (springOffset ?? 0) * 0.75) {
        this.isRecoiling = true;

        this._applyHeightLimiter();
        this.currentOffsetFromBottom =
          this.currentOffsetFromBottom < (this.props.initialOffsetFromBottom ?? 0)
            ? (this.props.initialOffsetFromBottom as number)
            : 1;
        let scrollOffset =
          this.actionSheetHeight * this.currentOffsetFromBottom + correction + (extraScroll ?? 0);

        this._scrollTo(scrollOffset);
        await waitAsync(300);
        this.isRecoiling = false;
        this.props.onPositionChanged && this.props.onPositionChanged(true);
      } else {
        this._returnToPrevScrollPosition(this.actionSheetHeight);
      }
    } else {
      if (this.prevScroll - verticalOffset > (springOffset ?? 0)) {
        this._hideModal();
      } else {
        if (this.isRecoiling) {
          return;
        }

        this.isRecoiling = true;
        this._returnToPrevScrollPosition(this.actionSheetHeight);
        await waitAsync(300);
        this.isRecoiling = false;
      }
    }
  };

  updateActionSheetPosition(scrollPosition: number) {
    if (this.actionSheetHeight >= this.state.deviceHeight - 1) {
      let correction = this.state.deviceHeight * 0.15;
      let distanceFromTop = this.actionSheetHeight + correction - scrollPosition;
      if (distanceFromTop < safeAreaPaddingTop) {
        if (!this.props.drawUnderStatusBar) return;
        this.indicatorTranslateY.setValue(0);
      } else {
        this.indicatorTranslateY.setValue(-safeAreaPaddingTop);
      }
    }
  }

  _returnToPrevScrollPosition(height: number) {
    let correction = this.state.deviceHeight * 0.15;
    let scrollOffset =
      height * this.currentOffsetFromBottom + correction + (this.props.extraScroll ?? 0);

    this.updateActionSheetPosition(scrollOffset);
    this._scrollTo(scrollOffset);
  }

  _scrollTo = (y: number, animated = true) => {
    this.scrollAnimationEndValue = y;
    this.prevScroll = y;
    this.scrollViewRef.current?._listRef._scrollRef.scrollTo({
      x: 0,
      y: this.scrollAnimationEndValue,
      animated: animated,
    });
  };

  _onTouchMove = () => {
    if (this.props.closeOnTouchBackdrop) {
      this._hideModal();
    }
    this.setState({
      scrollable: false,
    });
  };

  _onTouchStart = () => {
    if (this.props.closeOnTouchBackdrop) {
      this._hideModal();
    }
    this.setState({
      scrollable: false,
    });
  };

  _onTouchEnd = () => {
    this._returnToPrevScrollPosition(this.actionSheetHeight);
    if (this.props.gestureEnabled) {
      this.setState({
        scrollable: true,
      });
    }
  };

  _onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.offsetY = event.nativeEvent.contentOffset.y;

    let correction = this.state.deviceHeight * 0.15;
    let distanceFromTop = this.actionSheetHeight + correction - this.offsetY;

    if (this.actionSheetHeight < this.offsetY) {
      if (!this.isReachedTop) {
        this.isReachedTop = true;
        this.props.onPositionChanged && this.props.onPositionChanged(true);
      }
    } else {
      if (this.isReachedTop) {
        this.isReachedTop = false;
        this.props.onPositionChanged && this.props.onPositionChanged(false);
      }
    }

    if (this.actionSheetHeight >= this.state.deviceHeight - 1) {
      if (distanceFromTop < safeAreaPaddingTop) {
        if (!this.props.drawUnderStatusBar) return;

        this.indicatorTranslateY.setValue(
          -this.state.paddingTop + (safeAreaPaddingTop - distanceFromTop)
        );
      } else {
        this.indicatorTranslateY.setValue(-safeAreaPaddingTop);
      }
    }
  };

  _onRequestClose = () => {
    if (this.props.closeOnPressBack) this._hideModal();
  };

  _onTouchBackdrop = () => {
    if (this.props.closeOnTouchBackdrop) {
      this._hideModal();
    }
  };

  componentDidMount() {
    Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      this._onKeyboardShow
    );

    Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      this._onKeyboardHide
    );
  }

  _onKeyboardShow = (event: KeyboardEvent) => {
    this.setState({
      keyboard: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ReactNativeVersion = require("react-native/Libraries/Core/ReactNativeVersion");

    let v = ReactNativeVersion.version.major + ReactNativeVersion.version.minor;
    v = parseInt(v);

    if (v >= 63 || Platform.OS === "ios") {
      let keyboardHeight = event.endCoordinates.height;
      const {height: windowHeight} = Dimensions.get("window");

      const currentlyFocusedField = TextInput.State.currentlyFocusedField
        ? findNodeHandle(TextInput.State.currentlyFocusedField())
        : TextInput.State.currentlyFocusedField();

      if (!currentlyFocusedField) {
        return;
      }

      UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        let toValue = this.props.keyboardMode === "position" ? -(keyboardHeight + 15) : gap - 10;

        Animated.timing(this.transformValue, {
          toValue: toValue,
          duration: 250,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(this.transformValue, {
        toValue: -10,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  /**
   * Attach this to any child ScrollView Component's onScrollEndDrag,
   * onMomentumScrollEnd,onScrollAnimationEnd callbacks to handle the ActionSheet
   * closing and bouncing back properly.
   */

  handleChildScrollEnd = async () => {
    if (this.offsetY > this.prevScroll) return;
    if (this.prevScroll - (this.props.springOffset ?? 0) > this.offsetY) {
      let scrollOffset = this.getInitialScrollPosition();
      if (this.offsetY > scrollOffset - 100) {
        this.isRecoiling = true;
        this._scrollTo(scrollOffset);
        this.currentOffsetFromBottom = this.props.initialOffsetFromBottom ?? 0;
        this.prevScroll = scrollOffset;
        setTimeout(() => {
          this.isRecoiling = false;
        }, 500);
      } else {
        this._hideModal();
      }
    } else {
      this.isRecoiling = true;
      this._scrollTo(this.prevScroll, true);
      setTimeout(() => {
        this.isRecoiling = false;
      }, 500);
    }
  };

  _onKeyboardHide = () => {
    this.setState({
      keyboard: false,
    });
    this.opacityValue.setValue(1);
    Animated.timing(this.transformValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  componentWillUnmount() {
    Keyboard.removeListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      this._onKeyboardShow
    );

    Keyboard.removeListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      this._onKeyboardHide
    );
  }

  _onDeviceLayout = async (_event: any) => {
    let event = {..._event};

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(async () => {
      let safeMarginFromTop = 0;
      let measuredPadding = Platform.OS === "ios" ? await this.measure() : StatusBar.currentHeight;

      if (!this.props.drawUnderStatusBar) {
        if (Platform.OS === "android" && !this.props.statusBarTranslucent) return;
        safeMarginFromTop = measuredPadding ?? 0;
        this.indicatorTranslateY.setValue(-(measuredPadding as number));
      } else {
        this.updateActionSheetPosition(this.offsetY);
      }
      let height = event.nativeEvent.layout.height - safeMarginFromTop;
      let width = Dimensions.get("window").width;
      if (
        height?.toFixed(0) === calculatedDeviceHeight?.toFixed(0) &&
        width?.toFixed(0) === this.state.deviceWidth?.toFixed(0) &&
        this.deviceLayoutCalled
      )
        return;
      this.deviceLayoutCalled = true;
      calculatedDeviceHeight = height;
      this.setState({
        deviceHeight: height,
        deviceWidth: width,
        portrait: height > width,
        paddingTop: measuredPadding as any,
      });
    }, 1);
  };

  getInitialScrollPosition() {
    this._applyHeightLimiter();
    let correction = this.state.deviceHeight * 0.15;
    let scrollPosition = this.props.gestureEnabled
      ? this.actionSheetHeight * (this.props.initialOffsetFromBottom ?? 0) +
        correction +
        (this.props.extraScroll ?? 0)
      : this.actionSheetHeight + correction + (this.props.extraScroll ?? 0);
    this.currentOffsetFromBottom = this.props.initialOffsetFromBottom ?? 0;
    this.updateActionSheetPosition(scrollPosition);

    return scrollPosition;
  }

  _keyExtractor = (item: any) => item;

  render() {
    let {scrollable, modalVisible, keyboard} = this.state;
    let {
      onOpen,
      overlayColor,
      gestureEnabled,
      elevation,
      indicatorColor,
      defaultOverlayOpacity,
      children,
      containerStyle,
      CustomHeaderComponent,
      headerAlwaysVisible,
      keyboardShouldPersistTaps,
      statusBarTranslucent,
    } = this.props;

    return (
      <Modal
        visible={modalVisible}
        animationType="none"
        // testID={testID}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onShow={onOpen}
        onRequestClose={this._onRequestClose}
        transparent={true}
        statusBarTranslucent={statusBarTranslucent}
      >
        <Animated.View
          onLayout={this._onDeviceLayout}
          style={[
            styles.parentContainer,
            {
              opacity: this.opacityValue,
              width: this.state.deviceWidth,
            },
          ]}
        >
          <SafeAreaView ref={this.safeAreaViewRef} style={styles.safearea}>
            <View />
          </SafeAreaView>
          <FlatList
            bounces={false}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            ref={this.scrollViewRef}
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            onMomentumScrollBegin={this._onScrollBegin}
            onMomentumScrollEnd={this._onScrollEnd}
            scrollEnabled={scrollable && !keyboard}
            onScrollBeginDrag={this._onScrollBeginDrag}
            onTouchEnd={this._onTouchEnd}
            onScroll={this._onScroll}
            scrollsToTop={false}
            style={[
              styles.scrollView,
              {
                width: this.state.deviceWidth,
              },
            ]}
            contentContainerStyle={{
              width: this.state.deviceWidth,
            }}
            data={dummyData}
            keyExtractor={this._keyExtractor}
            renderItem={() => (
              <View
                style={{
                  width: "100%",
                }}
              >
                <Animated.View
                  onTouchStart={this._onTouchBackdrop}
                  onTouchMove={this._onTouchBackdrop}
                  onTouchEnd={this._onTouchBackdrop}
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: 1,
                    backgroundColor: overlayColor,
                    opacity: defaultOverlayOpacity,
                  }}
                />
                <View
                  onTouchMove={this._onTouchMove}
                  onTouchStart={this._onTouchStart}
                  onTouchEnd={this._onTouchEnd}
                  style={{
                    height: this.state.deviceHeight * 1.15,
                    width: "100%",
                    zIndex: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={this._onTouchBackdrop}
                    onLongPress={this._onTouchBackdrop}
                    style={{
                      height: this.state.deviceHeight * 1.15,
                      width: "100%",
                    }}
                  />
                </View>

                <Animated.View
                  onLayout={this._showModal}
                  style={[
                    styles.container,
                    {
                      borderRadius: 10,
                    },
                    containerStyle,
                    {
                      ...getElevation(elevation),
                      zIndex: 11,
                      opacity: this.opacityValue,
                      transform: [
                        {
                          translateY: this.transformValue,
                        },
                      ],
                      maxHeight: this.state.deviceHeight,
                    },
                  ]}
                >
                  <Animated.View
                    style={{
                      maxHeight: this.state.deviceHeight,
                      transform: [
                        {
                          translateY: this.indicatorTranslateY,
                        },
                      ],
                      marginTop: this.state.paddingTop,
                    }}
                  >
                    {gestureEnabled || headerAlwaysVisible ? (
                      CustomHeaderComponent ? (
                        CustomHeaderComponent
                      ) : (
                        <Animated.View
                          style={[styles.indicator, {backgroundColor: indicatorColor}]}
                        />
                      )
                    ) : null}

                    {children}
                  </Animated.View>
                </Animated.View>
              </View>
            )}
          />
        </Animated.View>
      </Modal>
    );
  }
}
