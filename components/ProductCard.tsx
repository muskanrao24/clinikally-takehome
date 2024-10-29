import { UIProduct } from "@/types";
import { Text, View } from "react-native";
import { Rating } from "@/components/Ratings";
import Animated from "react-native-reanimated";
import Button from "./Button";
import { useContext } from "react";
import CartContext from "@/contexts/CartContext";
import { Link } from "expo-router";

export default function ProductCard({ product }: { product: UIProduct }) {
  const { addItem } = useContext(CartContext);

  return (
    <View
      style={{
        flexShrink: 0,
        flexGrow: 0,
        padding: 10,
        paddingLeft: 15,
        backgroundColor: "white",
        gap: 5,
      }}
    >
      <Link href={`/details/${product.productId}`}>
        <View>
          <Animated.Image
            source={product.productImg}
            resizeMode="contain"
            style={{
              width: 160,
              height: 160,
              borderRadius: 15,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {product.name}
          </Text>
        </View>
      </Link>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "baseline",
          gap: 5,
        }}
      >
        <Rating stars={product.rating} />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "300",
          }}
        >
          {product.rating.toFixed(2)}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "green",
          paddingLeft: 5,
        }}
      >
        ₹ {product.price.toFixed(2)}
      </Text>
      <Button
        onPress={() => {
          addItem(product);
        }}
        style={{
          marginTop: 10,
        }}
      >
        Add To Cart
      </Button>
    </View>
  );
}
