import React from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { FilledStar, EmptyStar } from "./Stars";

interface RatingProps {
  maxStars?: number;
  stars?: number;
  size?: number;
  color?: string;
  bordered?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  maxStars,
  stars,
  size,
  color,
  bordered,
}) => {
  const _number = maxStars ?? 5;
  const _stars = stars ?? 0;
  const _size = size ?? 25;
  const _color = color ?? "#FFDF00";
  const _bordered = bordered ?? false;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Array(_number)
        .fill("\u4215485")
        .map((item, index) => {
          if (_bordered) {
            return (
              <EmptyStar
                key={index}
                size={_size}
                color={_stars <= index + 1 ? "#BABABA" : _color}
              />
            );
          } else {
            if (_stars >= index + 1) {
              return <FilledStar key={index} size={_size} color={_color} />;
            } else {
              return <EmptyStar key={index} size={_size} color={_color} />;
            }
          }
        })}
    </View>
  );
};

interface RatingInputProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  maxStars?: number;
  stars?: number;
  size?: number;
  color?: string;
  bordered?: boolean;
  onRating?: () => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  rating,
  setRating,
  maxStars,
  size,
  color,
  bordered,
  onRating = () => {},
}) => {
  const _number = maxStars ?? 5;
  const _size = size ?? 25;
  const _color = color ?? "#FFDF00";
  const _bordered = bordered ?? false;
  const [_firstRender, setFirstRender] = React.useState(true);

  const _anim = React.useRef(new Animated.Value(1)).current;

  const _up = () => {
    Animated.timing(_anim, {
      toValue: 1.5,
      duration: 150,
      useNativeDriver: true,
    }).start(({ finished }) => {
      _down();
    });
  };

  const _down = () => {
    Animated.timing(_anim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (!_firstRender) {
      onRating();
    }
  }, [rating]);

  return (
    <View style={{ flexDirection: "row" }}>
      {Array(_number)
        .fill("\u4215488")
        .map((item, index) => {
          if (_bordered) {
            return (
              <Animated.View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    _up();
                    setRating(index + 1);
                    setFirstRender(false);
                  }}
                  style={
                    rating == index + 1
                      ? { transform: [{ scale: _anim }] }
                      : null
                  }
                >
                  <EmptyStar
                    size={_size}
                    color={rating < index + 1 ? "#BABABA" : _color}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          } else {
            if (rating < index + 1) {
              return (
                <Animated.View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      _up();
                      setRating(index + 1);
                      setFirstRender(false);
                    }}
                    style={
                      rating == index + 1
                        ? { transform: [{ scale: _anim }] }
                        : null
                    }
                  >
                    <EmptyStar size={_size} color={_color} />
                  </TouchableOpacity>
                </Animated.View>
              );
            } else {
              return (
                <Animated.View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      _up();
                      setRating(index + 1);
                      setFirstRender(false);
                    }}
                    style={
                      rating == index + 1
                        ? { transform: [{ scale: _anim }] }
                        : null
                    }
                  >
                    <FilledStar size={_size} color={_color} />
                  </TouchableOpacity>
                </Animated.View>
              );
            }
          }
        })}
    </View>
  );
};
