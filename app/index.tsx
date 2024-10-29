import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import Navbar from "@/components/Navbar";
import PaginationFooter from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { HomeCarouselImages, HomeProductImages } from "@/data/assets";
import { getProducts } from "@/data/csvData";
import { LabelType, UIProduct } from "@/types";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<UIProduct[]>(getProducts(0, 10));

  const scrollRef = useRef<ScrollView>();

  const goToPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setItems(getProducts((page - 1) * 10, page * 10));
    // Scroll to top when page changes
    scrollRef.current && scrollRef.current.scrollTo({ y: 0 });
  }, [page]);

  return (
    <ScrollView
      style={{
        flex: 1,
        gap: 10,
      }}
      // @ts-ignore
      ref={scrollRef}
    >
      <ImageCarousel height={170} />
      <Text
        style={{
          textAlign: "right",
          paddingRight: 10,
          fontSize: 14,
          fontWeight: "bold",
          color: "gray",
        }}
      >
        Showing {items.length} items
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        {items.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </View>
      <PaginationFooter
        currentPage={page}
        totalPages={10}
        onPageChange={goToPage}
      />
    </ScrollView>
  );
}
