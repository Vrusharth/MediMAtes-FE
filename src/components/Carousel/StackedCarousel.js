import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.9;
const OVERLAP = 8; // Overlap distance between cards

const StackedCarousel = ({ items, renderItem }) => {
  const [data, setData] = useState(items);

  const offsetX = useSharedValue(0);

  const moveCardToEnd = () => {
    setData((prev) => {
      const newData = [...prev];
      const firstItem = newData.shift();
      newData.push(firstItem);
      return newData;
    });
    offsetX.value = 0; // Reset the offset after moving the card
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      offsetX.value = event.translationX;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > CARD_WIDTH / 3) {
        // Swipe left or right (threshold is now CARD_WIDTH / 3 for faster response)
        offsetX.value = withTiming(
          event.translationX > 0 ? CARD_WIDTH : -CARD_WIDTH,
          { duration: 250 }, // Faster animation duration
          () => {
            runOnJS(moveCardToEnd)();
          }
        );
      } else {
        // Return to original position
        offsetX.value = withTiming(0, { duration: 50 }); // Faster reset
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetX.value }],
    };
  });

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        if (index === 0) {
          return (
            <GestureDetector gesture={panGesture} key={item.id}>
              <Animated.View style={[styles.card, styles.topCard, animatedStyle]}>
                {renderItem(item)}
              </Animated.View>
            </GestureDetector>
          );
        } else if (index < 3) {
          return (
            <View
              key={item.id}
              style={[
                styles.card,
                styles.stackedCard,
                {
                  top: -index * OVERLAP, // Stack cards upward
                  zIndex: -index,
                  opacity: 1 - index * 0.3, // Reduce opacity for stacked cards
                },
              ]}
            >
              {renderItem(item)}
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    // borderRadius: 10,
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  topCard: {
    zIndex: 1, // Ensure the top card is above others
  },
  stackedCard: {
    position: 'absolute',
  },
});

export default StackedCarousel;