import React, { PureComponent } from 'react';
import { AppState, AccessibilityInfo, NativeModules, ScrollView, Slider, Text, View } from 'react-native';
import { SpeechSynthesizer } from '@youi/react-native-youi';
import { connect } from 'react-redux';

import Photo from './Photo';
import Complex from './Complex';
import AccessibleHorizontalList from './AccessibileHorizontalList';

const { OrientationLock } = NativeModules;

class AppComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accessible: false,
      minimumValue: 0,
      maximumValue: 100,
      step: 5,
      value: 50,
    };

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
    AppState.addEventListener('change', this._onAppStateChange);

    AccessibilityInfo.fetch()
      .then(state => {
        this.setState({ accessible: state });
      })
      .catch(() =>{
        this.setState({ accessible: false });
      });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._onAppStateChange);
  }

  _onAppStateChange = (newAppState) => {
    if (newAppState === 'active') {
      AccessibilityInfo.fetch()
        .then(state => {
          this.setState({ accessible: state })
        })
        .catch(() => {
          this.setState({ accessible: false })
        });
    }
  };

  _onAccessibilityAction = (event) => {
    const { actionName } = event.nativeEvent;

    const { maximumValue, minimumValue, step, value } = this.state;

    let utterance = '';

    switch(actionName) {
      case 'increment':
        if (value < maximumValue) {
          this.setState({ value: value + step });
          utterance = `${value + step}`;
        }
        break;
      case 'decrement':
        if (value > minimumValue) {
          this.setState({ value: value - step });
          utterance = `${value - step}`;
        }
        break;
      default:
        utterance = `Accessibility action ${actionName}`;
        break;
    };

    SpeechSynthesizer.speak(utterance);
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

  _renderComplex = (data) => {
    return (
      <Complex
        style={styles.wideStyle}
        firstButtonText={data.item.firstButtonText}
        secondButtonText={data.item.secondButtonText}
        activateText={data.item.activateText}
        escapeText={data.item.escapeText}
        title={data.item.title}
      />
    );
  };

  render = () => {
    const { maximumValue, minimumValue, step, value } = this.state;

    const { posters, landscapes, blurry } = this.props.photos;
    const { complexes } = this.props.complexes;

    const accessibilityText = this.state.accessible ? 'accessibility enabled' : 'accessibility disabled';

    return (
      <ScrollView
        ref={this.listRef}
        style={{ flex: 1 }}
      >
        <View style={{
          alignItems: 'center',
          padding: 5,
          backgroundColor: 'white',
        }}>
          <Text style={{ fontSize: 14, color: 'black' }}>Accessibility Sample</Text>
          <Text style={{ fontSize: 8, color: 'black' }}>{accessibilityText}</Text>
        </View>
        <View style={{
          alignItems: 'center',
          padding: 5,
          backgroundColor: 'white',
        }}>
          <Slider
            accessible
            accessibilityLabel={'Slider '}
            accessibilityRole={'adjustable'}
            accessibilityHint={`${value}`}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={this._onAccessibilityAction}
            maximumValue={maximumValue}
            minimumValue={minimumValue}
            value={value}
            step={step}
          />
        </View>
        <AccessibleHorizontalList accessibilityLabel={'Complex List '} data={complexes} renderItem={this._renderComplex} />
        <AccessibleHorizontalList accessibilityLabel={'Poster List '} data={posters} renderItem={this._renderPoster} />
        <AccessibleHorizontalList accessibilityLabel={'Landscape List '} data={landscapes} renderItem={this._renderLandscape} />
        <AccessibleHorizontalList accessibilityLabel={'Blurry List '} data={blurry} renderItem={this._renderBlurry} />
        <AccessibleHorizontalList accessibilityLabel={'Complex List '} data={complexes} renderItem={this._renderComplex} />
        <AccessibleHorizontalList accessibilityLabel={'Poster List '} data={posters} renderItem={this._renderPoster} />
        <AccessibleHorizontalList accessibilityLabel={'Landscape List '} data={landscapes} renderItem={this._renderLandscape} />
        <AccessibleHorizontalList accessibilityLabel={'Blurry List '} data={blurry} renderItem={this._renderBlurry} />
        <AccessibleHorizontalList accessibilityLabel={'Complex List '} data={complexes} renderItem={this._renderComplex} />
        <AccessibleHorizontalList accessibilityLabel={'Poster List '} data={posters} renderItem={this._renderPoster} />
        <AccessibleHorizontalList accessibilityLabel={'Landscape List '} data={landscapes} renderItem={this._renderLandscape} />
        <AccessibleHorizontalList accessibilityLabel={'Blurry List '} data={blurry} renderItem={this._renderBlurry} />
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
  const { photos, complexes } = state;

  return { photos, complexes };
};

export default connect(mapStateToProps)(AppComponent);
