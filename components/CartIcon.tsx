import CartContext from "@/contexts/CartContext";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function CartIcon() {
  const { items } = useContext(CartContext);

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <AntDesign name="shoppingcart" size={24} color="black" />
      <Text
        style={{
          position: "absolute",
          color: "black",
          fontSize: 12,
          fontWeight: "bold",
          top: -10,
          right: -10,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          padding: 2,
          borderRadius: 50,
          width: 20,
          height: 20,
          textAlign: "center",
        }}
      >
        {items.length}
      </Text>
    </View>
  );
}
