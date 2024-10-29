import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export enum LogisticsProvider {
  A,
  B,
  GENERAL,
}

// Function to calculate remaining time for Provider A
const getRemainingTimeForProviderA = () => {
  const now = new Date();
  const deadline = new Date();
  deadline.setHours(17, 0, 0, 0); // 5 PM today

  if (now.getHours() >= 17) {
    // If it's already past 5 PM, next possible same-day delivery is tomorrow
    deadline.setDate(deadline.getDate() + 1);
  }

  return deadline.getTime() - now.getTime();
};

// Function to calculate remaining time for Provider B
const getRemainingTimeForProviderB = () => {
  const now = new Date();
  const deadline = new Date();

  if (now.getHours() < 9) {
    deadline.setHours(9, 0, 0, 0); // 9 AM today
  } else {
    // Next-day delivery
    deadline.setDate(deadline.getDate() + 1);
    deadline.setHours(9, 0, 0, 0);
  }

  return deadline.getTime() - now.getTime();
};

// Logistics component
const Logistics = ({
  partner,
  available,
  tat,
}: {
  partner: LogisticsProvider;
  available: boolean;
  tat?: number;
}) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (!available) {
      setRemainingTime(null); // No countdown if not in stock
      return;
    }

    const updateRemainingTime = () => {
      let time: number | null = null;

      if (partner === LogisticsProvider.A) {
        time = getRemainingTimeForProviderA();
      } else if (partner === LogisticsProvider.B) {
        time = getRemainingTimeForProviderB();
      } else {
        time = null; // General partners do not have a countdown
      }

      setRemainingTime(time);
    };

    updateRemainingTime(); // Initial calculation

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime ? prevTime - 1000 : null));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [partner, available]); // Removed remainingTime from dependencies

  // Format time remaining to a readable string
  const formatTimeRemaining = (timeInMillis: number): string => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>
      {available ? (
        <>
          {partner === LogisticsProvider.A &&
            remainingTime !== null &&
            remainingTime > 0 && (
              <View style={styles.timerContainer}>
                <Text style={styles.title}>
                  Provider A: Same-day Delivery Countdown
                </Text>
                <Text style={styles.timer}>
                  {formatTimeRemaining(remainingTime)}
                </Text>
              </View>
            )}
          {partner === LogisticsProvider.B &&
            remainingTime !== null &&
            remainingTime > 0 && (
              <View style={styles.timerContainer}>
                <Text style={styles.title}>
                  Provider B: Same-day Delivery Countdown
                </Text>
                <Text style={styles.timer}>
                  {formatTimeRemaining(remainingTime)}
                </Text>
              </View>
            )}
          {partner === LogisticsProvider.GENERAL && (
            <View style={styles.generalContainer}>
              <Text style={styles.title}>
                General Partners: Delivery within {tat ?? "2 - 5"} days
              </Text>
            </View>
          )}
        </>
      ) : (
        <View style={styles.outOfStockContainer}>
          <Text style={styles.outOfStockText}>
            This product is currently out of stock.
          </Text>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
  },
  timerContainer: {
    marginBottom: 15,
  },
  generalContainer: {
    marginBottom: 15,
  },
  outOfStockContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 5,
  },
  outOfStockText: {
    color: "#721c24",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 16,
    color: "red",
  },
});

export default Logistics;
