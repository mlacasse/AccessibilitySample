import React, { PureComponent } from 'react';
import { AccessibilityInfo, Text, View, TouchableWithoutFeedback, findNodeHandle } from 'react-native';
import { FormFactor } from '@youi/react-native-youi';

class Complex extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };

    this.buttonRef = React.createRef();
    this.veiwRef = React.createRef();
  }

  _onAccessibilityEscape = (event) => {
    if (this.veiwRef.current) {
      AccessibilityInfo.setAccessibilityFocus(findNodeHandle(this.veiwRef.current));
    }

    this._onBlur();
  };

  _onAccessibilityTap = (event) => {
    if (this.buttonRef.current) {
      AccessibilityInfo.setAccessibilityFocus(findNodeHandle(this.buttonRef.current));
    }

    this._onFocus();
  };

  _onPress = () => {
    AccessibilityInfo.announceForAccessibility(`${this.props.title} pressed`);
  };

  _onFocus = () => {
    this.setState({ focused: true });
  };

  _onBlur = () => {
    this.setState({ focused: false });
  };

  render = () => {
    const { title, firstButtonText, secondButtonText, style, activateText, escapeText } = this.props;

    const { focused } = this.state;

    const containerStyle = {
      ...style,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    };

    const textStyle = { fontSize: FormFactor.isTV ? 28 : 12, color: 'white' };
    const smallTextStyle = { fontSize: FormFactor.isTV ? 18 : 8, color: 'white' };

    const accessibilityProps = {
      accessible: !focused,
      accessibilityLabel: `${title}`,
      accessibilityHint: this.props.accessibilityHint ? this.props.accessibilityHint : null,
      onAccessibilityTap: this._onAccessibilityTap,
    };

    return (
      <View
        ref={this.veiwRef}
        style={containerStyle}
        {...accessibilityProps}
      >
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View
            ref={this.buttonRef}
            accessible={focused}
            onAccessibilityEscape={this._onAccessibilityEscape}
            onAccessibilityTap={this._onPress}
            style={{ padding: 5, backgroundColor: 'red' }}
          >
            <Text accessible={focused} style={textStyle}>
              {firstButtonText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text
          accessible={focused}
          onAccessibilityEscape={this._onAccessibilityEscape}
          style={textStyle}
        >
          {`${title}`}
        </Text>
        <Text
          accessible={focused}
          onAccessibilityEscape={this._onAccessibilityEscape}
          style={smallTextStyle}
        >
          {focused ? escapeText : activateText}
        </Text>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View
            accessible={focused}
            onAccessibilityEscape={this._onAccessibilityEscape}
            onAccessibilityTap={this._onPress}     
            style={{ padding: 5, backgroundColor: 'green' }}
          >
            <Text accessible={focused} style={textStyle}>
              {secondButtonText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
}

export default Complex;
