import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  loadingSize?: number | "small" | "large";
  loadingStyle?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconStyle?: StyleProp<ViewStyle>;
}

const Button = ({
  children,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  loadingColor = "#000",
  loadingSize = "small",
  loadingStyle,
  icon,
  iconPosition = "left",
  iconStyle,
}: ButtonProps) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <TouchableOpacity
      style={[disabled && { opacity: 0.5 }]}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPressIn={() => setFocused(true)}
      onPressOut={() => setFocused(false)}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          size={loadingSize}
          color={loadingColor}
          style={loadingStyle}
        />
      ) : (
        <View
          style={[
            {
              flexDirection: iconPosition === "left" ? "row" : "row-reverse",
              alignItems: "center",
              borderRadius: 20,
              borderColor: "#701ac6",
              borderWidth: 1,
              padding: 6,
              justifyContent: "center",
              backgroundColor: focused ? "#701ac6" : "#fff",
            },
            style,
          ]}
        >
          {icon && <View style={iconStyle}>{icon}</View>}
          <Text
            style={[
              {
                color: focused ? "#fff" : "#701ac6",
                fontWeight: "bold",
                fontSize: 14,
                textTransform: "uppercase",
                backgroundColor: "transparent",
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
