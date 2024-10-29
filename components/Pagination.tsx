import { Text, View } from "react-native";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";

export default function PaginationFooter({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const MAX_PAGES = 5; // Maximum number of pages to show before and after the ellipsis

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= MAX_PAGES + 2) {
      // Show all pages if totalPages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= MAX_PAGES - 2) {
        // Show first few pages and the last two pages
        pages.push(...[1, 2, 3, "...", totalPages - 1, totalPages]);
      } else if (currentPage >= totalPages - (MAX_PAGES - 2)) {
        // Show last few pages and the first two pages
        pages.push(
          ...[1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
        );
      } else {
        // Show pages around the current page with ellipses on both sides
        pages.push(
          ...[
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
          ]
        );
      }
    }
    return pages as [number | "..."];
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        padding: 10,
        marginBottom: 10,
      }}
    >
      <AntDesign
        name="arrowleft"
        size={24}
        color="black"
        onPress={() => onPageChange(currentPage - 1)}
        style={{
          backgroundColor: currentPage === 1 ? "transparent" : "#8c30ea",
          color: currentPage === 1 ? "#8c30ea" : "#fff",
          borderRadius: 20,
          padding: 6,
          marginRight: 15,
        }}
        disabled={currentPage === 1}
      />

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <Text key={index} style={{ marginHorizontal: 4, color: "#8c30ea" }}>
            ...
          </Text>
        ) : (
          <Button
            key={page}
            onPress={() => onPageChange(page)}
            style={{
              backgroundColor: currentPage === page ? "#8c30ea" : "transparent",
              aspectRatio: 1,
            }}
            textStyle={{
              color: currentPage === page ? "#fff" : "#8c30ea",
            }}
          >
            {page.toString()}
          </Button>
        )
      )}

      <AntDesign
        name="arrowright"
        size={24}
        color="black"
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          backgroundColor:
            currentPage === totalPages ? "transparent" : "#8c30ea",
          color: currentPage === totalPages ? "#8c30ea" : "#fff",
          borderRadius: 20,
          padding: 6,
          marginLeft: 15,
        }}
      />
    </View>
  );
}
