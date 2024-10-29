import Button from "@/components/Button";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Logistics from "@/components/Logistics";
import { getPincode, getProduct, getStock } from "@/data/csvData";
import { Pincode } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const isPincodeValid = (pincode: string) => {
  if (/^\d{6}$/.test(pincode) === false) {
    return false;
  }
  // Check pincode
  try {
    const pincodeData = getPincode(parseInt(pincode));
    return pincodeData;
  } catch (e) {
    return false;
  }
};

export default function DetailsFunction() {
  const { id } = useLocalSearchParams();

  if (!id || Array.isArray(id) || isNaN(parseInt(id))) {
    return <Redirect href="+not-found" />;
  }

  const [pincode, setPincode] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const pincodeData = useRef<Pincode | null>(null);
  const checkPincode = () => {
    const pi = isPincodeValid(pincode);
    setIsValid(!!pi);
    if (!!pi) {
      pincodeData.current = pi;
    }
  };

  useEffect(() => {
    const pi = isPincodeValid(pincode);
    if (!!pi) {
      pincodeData.current = pi;
      setIsValid(true);
    }
  }, [pincode]);

  try {
    const productData = getProduct(parseInt(id));
    const stockData = getStock(parseInt(id));
    return (
      <ScrollView
        style={{
          flexDirection: "column",
          gap: 10,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "light",
            paddingLeft: 20,
          }}
        >
          Home / {productData.name}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            paddingLeft: 20,
          }}
        >
          {productData.name}
        </Text>
        <ImageCarousel height={170} mode="parallax" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: 20,
            color: "green",
          }}
        >
          ₹ {productData.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            paddingLeft: 20,
            marginTop: 15,
          }}
        >
          Select delivery location
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            gap: 10,
          }}
        >
          <TextInput
            placeholder="Enter pincode"
            style={{
              flex: 1,
              fontSize: 16,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
            keyboardType="number-pad"
            onChangeText={(e) => {
              if (e.length > 6) return;
              setPincode(e);
            }}
            value={pincode}
          />
          <Button
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#8c30ea",
            }}
            textStyle={{
              color: "white",
            }}
            onPress={checkPincode}
          >
            Check
          </Button>
        </View>
        {isValid === false && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#f4d2d2",
              borderRadius: 10,
              marginHorizontal: 20,
              paddingHorizontal: 20,
            }}
          >
            <FontAwesome6 name="car-on" size={24} color="red" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
                paddingLeft: 20,
              }}
            >
              Invalid pincode
            </Text>
          </View>
        )}
        {isValid && (
          <Logistics
            available={stockData.available}
            partner={pincodeData.current!.logisticsProvider}
            tat={pincodeData.current!.tat}
          />
        )}
      </ScrollView>
    );
  } catch (e) {
    return <Redirect href="+not-found" />;
  }
}
