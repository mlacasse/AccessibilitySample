import React, { Fragment, PureComponent } from 'react';
import { FlatList, NativeModules, ScrollView, Slider, Text, View } from 'react-native';
import { SpeechSynthesizer } from '@youi/react-native-youi';
import { connect } from 'react-redux';

import Photo from './Photo';
import Complex from './Complex';

const { OrientationLock } = NativeModules;

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

  _onAccessibilityAction = (event) => {
    const { actionName } = event.nativeEvent;

    let utterance = '';

    switch(actionName) {
      default:
        utterance = `Accessibility action ${actionName}`;
        break;
    };

    SpeechSynthesizer.speak(utterance);
  };

  _renderBlurry = (data) => {
    const { blurry } = this.props.photos;

    return (
      <Photo
        style={styles.wideStyle}
        source={{ uri: data.item.uri }}
        title={data.item.title}
        index={data.index}
        accessibilityHint={`Item ${data.index + 1} of ${blurry.length} in Blurry.`}
      />
    );
  };

  _renderLandscape = (data) => {
    const { landscapes } = this.props.photos;

    return (
      <Photo
        style={styles.photoStyle}
        source={{ uri: data.item.uri }}
        title={data.item.title}
        index={data.index}
        accessibilityHint={`Item ${data.index + 1} of ${landscapes.length} in Landscapes.`}
      />
    );
  };

  _renderPoster = (data) => {
    const { posters } = this.props.photos;

    return (
      <Photo
        style={styles.posterStyle}
        source={{ uri: data.item.uri }}
        title={data.item.title}
        index={data.index}
        accessibilityHint={`Item ${data.index + 1} of ${posters.length} in Posters.`}
      />
    );
  };

  _renderComplex = (data) => {
    const { complexes } = this.props.complexes;

    return (
      <Complex
        style={styles.wideStyle}
        firstButtonText={data.item.firstButtonText}
        secondButtonText={data.item.secondButtonText}
        activateText={data.item.activateText}
        escapeText={data.item.escapeText}
        index={data.index}
        accessibilityHint={`Item ${data.index + 1} of ${complexes.length} in Complexes.`}
      />
    );
  };

  render = () => {
    const { posters, landscapes, blurry } = this.props.photos;
    const { complexes } = this.props.complexes;

    return (
      <Fragment>
        <View style={{
          alignItems: 'center',
          padding: 5,
          backgroundColor: 'white',
        }}>
          <Text style={{ fontSize: 14, color: 'black' }}>Accessibility Sample</Text>
        </View>
        <View style={{
          alignItems: 'center',
          padding: 5,
          backgroundColor: 'white',
        }}>
          <Slider
            accessible
            accessibilityLabel={'This is a slider '}
            accessibilityRole={'adjustable'}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={this._onAccessibilityAction}
            maximumValue={100}
            value={50}
            step={1}
          />
        </View>
        <ScrollView
          ref={this.listRef}
          style={{ flex: 1 }}
        >
          <FlatList horizontal keyExtractor={item => "" + item.id} data={complexes} renderItem={this._renderComplex} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={complexes} renderItem={this._renderComplex} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={complexes} renderItem={this._renderComplex} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={complexes} renderItem={this._renderComplex} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={posters} renderItem={this._renderPoster} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={landscapes} renderItem={this._renderLandscape} />
          <FlatList horizontal keyExtractor={item => "" + item.id} data={blurry} renderItem={this._renderBlurry} />
        </ScrollView>
      </Fragment>
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
  const { photos, complexes } = state;

  return { photos, complexes };
};

export default connect(mapStateToProps)(AppComponent);
