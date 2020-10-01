import React, { PureComponent } from "react";
import {
  AccessibilityInfo,
  Button,
  NativeModules,
  ScrollView,
  FlatList,
  Slider,
  Text,
  View,
} from "react-native";
import { FormFactor } from "@youi/react-native-youi";
import { connect } from "react-redux";

import Photo from "./Photo";
import Complex from "./Complex";
import AccessibleHorizontalList from "./AccessibleHorizontalList";

const { OrientationLock } = NativeModules;

const items = [
  { title: "A List" },
  { title: "B List" },
  { title: "C List" },
  { title: "D List" },
  { title: "E List" },
  { title: "F List" },
  { title: "G List" },
  { title: "H List" },
  { title: "I List" },
  { title: "J List" },
  { title: "K List" },
];

class AppComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accessible: false,
      minimumValue: 0,
      maximumValue: 100,
      step: 5,
      value: 50,
      lists: [],
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
    AccessibilityInfo.addEventListener("change", (accessible) =>
      this.setState({ accessible })
    );
    AccessibilityInfo.fetch().then((accessible) =>
      this.setState({ accessible })
    );

    // Reset accessibility focus
    AccessibilityInfo.setAccessibilityFocus(undefined);

    setTimeout(() => {
      this.setState({ lists: items });
    }, 2000);
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener("change", (accessible) =>
      this.setState({ accessible })
    );
  }

  _onAccessibilityAction = (event) => {
    const { actionName } = event.nativeEvent;

    const { maximumValue, minimumValue, step, value } = this.state;

    let utterance = "";

    switch (actionName) {
      case "increment":
        if (value < maximumValue) {
          this.setState({ value: value + step });
          utterance = `${value + step}`;
        }
        break;
      case "decrement":
        if (value > minimumValue) {
          this.setState({ value: value - step });
          utterance = `${value - step}`;
        }
        break;
      default:
        utterance = `Accessibility action ${actionName}`;
        break;
    }

    AccessibilityInfo.announceForAccessibility(utterance);
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

    const accessibilityText = this.state.accessible
      ? "accessibility enabled"
      : "accessibility disabled";

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            padding: 5,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: FormFactor.isTV ? 60 : 14, color: "black" }}>
            Accessibility Sample
          </Text>
          <Text style={{ fontSize: FormFactor.isTV ? 40 : 8, color: "black" }}>
            {accessibilityText}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: FormFactor.isTV ? 25 : 5,
            backgroundColor: "white",
          }}
        >
          <Slider
            accessible
            accessibilityLabel={"Slider "}
            accessibilityRole={"adjustable"}
            accessibilityHint={`${value}`}
            accessibilityActions={[
              { name: "increment" },
              { name: "decrement" },
            ]}
            onAccessibilityAction={this._onAccessibilityAction}
            maximumValue={maximumValue}
            minimumValue={minimumValue}
            value={value}
            step={step}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.lists}
            initialNumToRender={2}
            removeClippedSubviews
            keyExtractor={(data, index) => `section-${index}`}
            maxToRenderPerBatch={4}
            updateCellsBatchingPeriod={150}
            onEndReachedThreshold={0.25}
            scrollEventThrottle={16}
            ListHeaderComponent={<View><Text style={{
                color: "white",
                fontSize: 24,
                marginBottom: 12,
                textAlign: "center",
            }}>I'm A List Header</Text></View>}
            renderItem={({ item }) => {
              return (

                <View accessible>
                  <Text
                    accessible={false}
                    style={{
                      color: "white",
                      fontSize: 24,
                      marginBottom: 12,
                      textAlign: "center",
                    }}
                  >
                    {item.title}
                  </Text>
                  <AccessibleHorizontalList
                    accessibilityLabel={item.title}
                    data={complexes}
                    renderItem={this._renderComplex}
                  />
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: FormFactor.isTV ? 25 : 5,
            backgroundColor: "white",
          }}
        >
          <Button
            title={"1"}
            onPress={() => {
              AccessibilityInfo.announceForAccessibility("Button 1 was tapped");
            }}
            accessibilityLabel={"1"}
          />
          <Button
            title={"2"}
            onPress={() => {
              AccessibilityInfo.announceForAccessibility("Button 2 was tapped");
            }}
            accessibilityLabel={"2"}
          />
          <Button
            title={"3"}
            onPress={() => {
              AccessibilityInfo.announceForAccessibility("Button 3 was tapped");
            }}
            accessibilityLabel={"3"}
          />
        </View>
      </View>
    );
  };
}

const styles = {
  photoStyle: {
    width: FormFactor.isTV ? 490 : 98,
    height: FormFactor.isTV ? 370 : 74,
  },
  posterStyle: {
    width: FormFactor.isTV ? 250 : 50,
    height: FormFactor.isTV ? 375 : 75,
  },
  wideStyle: {
    width: FormFactor.isTV ? 400 : 160,
    height: FormFactor.isTV ? 225 : 90,
  },
};

const mapStateToProps = (state) => {
  const { photos, complexes } = state;

  return { photos, complexes };
};

export default connect(mapStateToProps)(AppComponent);
