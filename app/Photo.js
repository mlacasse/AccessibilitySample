import React, { PureComponent } from 'react';
import { Image, TouchableWithoutFeedback, View, AccessibilityInfo } from 'react-native';

class Photo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };
  }

  _onAccessibilityAction = (event) => {
    const { actionName } = event.nativeEvent;

    let utterance = '';

    switch(actionName) {
      case 'activate':
        utterance = `Accessibility action ${actionName} image ${this.props.index} ${this.props.title}`;

        this._onPress();

        break;
      default:
        utterance = `Accessibility action ${actionName}`;
        break;
    };

    AccessibilityInfo.announceForAccessibility(utterance);
  };

  _onPress = () => {
    console.log(`Image ${this.props.index} ${this.props.title} pressed!`);
  };

  _onFocus = () => {
    this.setState({ focused: true });
  };

  _onBlur = () => {
    this.setState({ focused: false });
  };

  _onError = () => {
    console.trace(`Image ${this.props.title} failed!  Check ${this.props.source.uri}!`);
  };

  render = () => {
    const { source, title, index, style } = this.props;
  
    const containerStyle = {
      margin: 1,
      borderWidth: 1,
      borderColor: this.state.focused ? 'white' : 'black',
    };

    const accessibilityProps = {
      accessible: true,
      accessibilityLabel: `Poster ${index} ${title}`,
      accessibilityHint: this.props.accessibilityHint ? this.props.accessibilityHint : null,
      accessibilityRole: 'image',
      accessibilityActions: [{ name: 'activate' }, { name: 'escape' }, { name: 'magicTap' }],
      onAccessibilityAction: this._onAccessibilityAction,
    };

    return (
      <View
        style={containerStyle}
        focusable
        {...accessibilityProps}
      >
        <TouchableWithoutFeedback
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onPress={this._onPress}
        >
          <Image
            style={style}
            source={source}
            resizeMode='contain'
            resizeMethod='auto'
            onError={this._onError}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
}

export default Photo;
