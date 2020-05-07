import React, { PureComponent } from 'react';
import { AppState, FlatList, NativeModules, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Photo from './Photo';

const { OrientationLock, AccessibilityInfo } = NativeModules;

class AppComponent extends PureComponent {
  constructor(props) {
    super(props);

    // 0 = Landscape
    // 1 = Portrait
    // 2 = Auto
    // 3 = LandscapeRight
    // 4 = LandscapeLeft
    // 5 = PortraitUpright
    // 6 = AutoUpright

    OrientationLock.setRotationMode(6);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    if (AccessibilityInfo) {
      AccessibilityInfo.get()
        .then(info => console.log('AccessibilityInfo', info))
        .catch(err => console.error(err));
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (newAppState) => {
    if (AccessibilityInfo && newAppState === 'active') {
      AccessibilityInfo.get()
        .then(info => console.log('AppState', newAppState, 'AccessibilityInfo', info))
        .catch(err => console.error(err));
    }
  };

  _renderBlurry = (data) => {
    return (
      <Photo
        style={styles.wideStyle}
        source={{ uri: data.item.uri }}
        title={data.item.title}
        index={data.index}
      />
    );
  };

  _renderLandscape = (data) => {
    return (
      <Photo
        style={styles.photoStyle}
        source={{ uri: data.item.uri }}
        title={data.item.title}
        index={data.index}
      />
    );
  };

  _renderPoster = (data) => {
    return (
      <Photo
        style={styles.posterStyle}
        source={{ uri: data.item.uri }}
        title={data.item.title}
        index={data.index}
      />
    );
  };

  render = () => {
    const { posters, landscapes, blurry } = this.props.photos;

    return (
      <ScrollView style={{ flex: 1 }}>
        <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
        <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
      </ScrollView>
    );
  };
};

const styles = {
  photoStyle: {
    width: 98,
    height: 74,
  },
  posterStyle: {
    width: 50,
    height: 75,
  },
  wideStyle: {
    width: 160,
    height: 90,
  },
};

const mapStateToProps = state => {
  const { photos } = state;

  return { photos };
};

export default connect(mapStateToProps)(AppComponent);
