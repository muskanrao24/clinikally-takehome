import * as React from "react";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { ImageStyle, StyleProp } from "react-native";
import { CarouselRenderItem } from "react-native-reanimated-carousel";
import { SlideItem } from "./SlideItem";

interface Options {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}

export const renderItem =
  ({ rounded = true, style }: Options = {}): CarouselRenderItem<any> =>
  ({ index }: { index: number }) =>
    <SlideItem key={index} index={index} rounded={rounded} style={style} />;

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

export default function ImageCarousel({ height }: { height: number }) {
  const progress = useSharedValue<number>(0);

  return (
    <View id="carousel-component">
      <Carousel
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        height={height}
        loop={true}
        pagingEnabled={true}
        autoPlay={true}
        snapEnabled={true}
        width={400}
        style={{
          width: 400,
          borderRadius: 15,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={(p) => (progress.value = p)}
        renderItem={renderItem({ rounded: true })}
      />
    </View>
  );
}
