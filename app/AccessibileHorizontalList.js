import React, { PureComponent, createRef } from 'react';
import { AccessibilityInfo, FlatList, View } from 'react-native';

class AccessibileHorizontalList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.listRef = createRef();
  }

  _incrementIndex = () => {
    const { data } = this.props;

    if (this.state.index === data.length - 1) return;

    this.setState(state => {
      const index = state.index + 1;
      const utterance = ` ${data[index].title} Item ${index + 1} of ${data.length} in Complexes.`;

      if (this.listRef.current) {
        this.listRef.current.scrollToIndex({ index });
      }

      AccessibilityInfo.announceForAccessibility(utterance);

      return { index }
    });
  };

  _decrementIndex = () => {
    const { data } = this.props;

    if (this.state.index === 0) return;

    this.setState(state => {
      const index = state.index - 1;
      const utterance = ` ${data[index].title} Item ${index + 1} of ${data.length} in Complexes.`;

      if (this.listRef.current) {
        this.listRef.current.scrollToIndex({ index });
      }

      AccessibilityInfo.announceForAccessibility(utterance);

      return { index }
    });
  };

  _onAccessibilityAction = (event) => {
    const { actionName } = event.nativeEvent;

    switch(actionName) {
      case 'increment':
        this._incrementIndex();
        break;
      case 'decrement':
        this._decrementIndex();
        break;
      default:
        AccessibilityInfo.announceForAccessibility(`${actionName}`);
        break;
    };
  };

  _renderItem = (data) => {
    if (this.props.renderItem) {
      return this.props.renderItem(data);
    }

    return <View {...data} />
  }

  render() {
    const { data = [], accessibilityLabel } = this.props;

    const accessibilityProps = {
      accessible: true,
      accessibilityLabel,
      accessibilityRole: 'adjustable',
      accessibilityActions: [{ name: 'activate' }, { name: 'increment' }, { name: 'decrement' }],
      onAccessibilityAction: this._onAccessibilityAction,
    };

    return (
      <FlatList
        ref={this.listRef}
        horizontal
        keyExtractor={item => "" + item.id}
        data={data}
        renderItem={this._renderItem}
        {...accessibilityProps}
      />
    )
  }
}

export default AccessibileHorizontalList;
