import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { View } from 'react-native';

class Scaler extends PureComponent {
  static propTypes = {
    xRatio: PropTypes.number.isRequired, // For video prefer - 16
    yRatio: PropTypes.number.isRequired, // For video prefer - 9
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    const { width, height } = Dimensions.get('window');

    this.state = {
      window: {
        width,  
        height,
      },
    };
  }

  componentDidMount = () => {
    Dimensions.addEventListener('change', this.handleOnOrientationChange);
  };

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.handleOnOrientationChange);
  };

  handleOnOrientationChange = ({ window })=> {
    this.setState({ window });
  };

  getScreenDimensions = () => {
    const { xRatio, yRatio } = this.props;
    const { window } = this.state;

    const isPortrait = window.height > window.width;

    const decimalRatio = yRatio / xRatio;

    const width = window.width;
    const height = isPortrait ? decimalRatio * width : window.height;

    return {
      width,
      height,
    };
  };

  render() {
    const { children } = this.props;

    const { width, height } = this.getScreenDimensions();

    return (
      <View style={{ width, height }}>
        {children}
      </View>
    );
  }
}

export default Scaler;
