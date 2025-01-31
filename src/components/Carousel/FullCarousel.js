import React, { useState, useRef } from 'react';
import { Button, Dimensions, View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { colorTheme } from '../../constant';

const Page = Dimensions.get('window');
const PAGE_WIDTH = Page.width;

// Define the CarouselComponent that accepts a `Component` prop
const FullCarousel = ({
  Component,
  data,
  autoPlay = true,
  fastInterval = 1000,
  pagingEnabled = true,
  onSnapToItem,
  onIndexChange,
  componentWidth = 0, // Default is 0 for full width
  loop = true,
  dynamicHeight,
  style
}) => {
  const [isFast, setIsFast] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index
  const ref = useRef(null);

  const baseOptions = {
    vertical: false,
    height: dynamicHeight ? PAGE_WIDTH * dynamicHeight : PAGE_WIDTH / 3,
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        {...baseOptions}
        loop={loop}
        ref={ref}
        style={[{ ...style, width: '100%' }]}
        autoPlay={autoPlay}
        autoPlayInterval={isFast ? fastInterval : 2002}
        data={data}
        pagingEnabled={pagingEnabled}
        width={PAGE_WIDTH - componentWidth} // Full width minus any offset
        onSnapToItem={(index) => {
          setCurrentIndex(index); // Update the index when snap happens
          if (onSnapToItem) onSnapToItem(index);
        }}
        renderItem={({ index }) => {
          try {
            const itemData = data[index];
            return <Component key={index} index={index} data={itemData} />;
          } catch (error) {
            console.error('Failed to parse data', error);
            return null;
          }
        }}
      />

      {/* Dot Indicator */}
        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot, // Apply active dot style
              ]}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: '15%',
    transform: [{ translateX: '-50%' }],
    flexDirection: 'row',
    alignItems:'center'
  },
  dot: {
    width: 8,
    height: 8,
    margin: 5,
    backgroundColor: colorTheme.borderColor,
    borderRadius: 5,
  },
  activeDot: {
    width: 11,
    height: 11,
    backgroundColor: colorTheme.primaryColor, // Active dot color
  },
});

export default FullCarousel;
