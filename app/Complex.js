import React, { PureComponent } from 'react';
import { AccessibilityInfo, Text, View, TouchableWithoutFeedback, findNodeHandle } from 'react-native';
import { SpeechSynthesizer } from '@youi/react-native-youi';

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
    SpeechSynthesizer.speak(`Complex ${this.props.index} pressed`);
  };

  _onFocus = () => {
    this.setState({ focused: true });
  };

  _onBlur = () => {
    this.setState({ focused: false });
  };

  render = () => {
    const { index, firstButtonText, secondButtonText, style, activateText, escapeText } = this.props;

    const { focused } = this.state;

    const containerStyle = {
      ...style,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    };

    const textStyle = { fontSize: 12, color: 'white' };
    const smallTextStyle = { fontSize: 8, color: 'white' };

    return (
      <View
        ref={this.veiwRef}
        style={containerStyle}
        accessible={!focused}
        accessibilityLabel={`Complex ${index}`}
        onAccessibilityEscape={this._onAccessibilityEscape}
        onAccessibilityTap={this._onAccessibilityTap}
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
        <Text accessible={focused} style={textStyle}>
          {`Complex ${index}`}
        </Text>
        <Text accessible={focused} style={smallTextStyle}>
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
