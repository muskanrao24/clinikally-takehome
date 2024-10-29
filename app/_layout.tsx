import Navbar from "@/components/Navbar";
import { CartProvider } from "@/contexts/CartContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <CartProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navbar />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="details" />
        </Stack>
      </GestureHandlerRootView>
    </CartProvider>
  );
}
