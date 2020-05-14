import React, { PureComponent, Fragment } from 'react';
import { AccessibilityInfo, FlatList, Text, View, findNodeHandle } from 'react-native';
import { SpeechSynthesizer } from '@youi/react-native-youi';

class AccessibleList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accessible: true,
    };

    this.viewRef = React.createRef();
    this.itemRef = React.createRef();
  }

  _onAccessibilityTap = (event) => {
    AccessibilityInfo.setAccessibilityFocus(findNodeHandle(this.itemRef.current));

    this.setState({ accessible: false });
  };

  _onAccessibilityEscape = (event) => {
    AccessibilityInfo.setAccessibilityFocus(findNodeHandle(this.viewRef.current));

    this.setState({ accessible: true });
  };

  _renderItem = (data) => {
    if (this.props.renderItem) {
      return this.props.renderItem({
        ...data,
        ref: data.index === 0 ? this.itemRef : undefined,
        onAccessibilityEscape: this._onAccessibilityEscape,
      });
    }
  };

  render = () => {
    const { accessibilityHint, accessibilityLabel, data } = this.props;

    return (
      <View
        ref={this.viewRef}
        accessible={this.state.accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        onAccessibilityTap={this._onAccessibilityTap}
      >
        <FlatList
          horizontal
          keyExtractor={item => "" + item.id}
          renderItem={this._renderItem}
          data={data}
        />
      </View>
    );
  };
}

export default AccessibleList;
