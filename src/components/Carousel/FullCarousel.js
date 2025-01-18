import React, { useState, useRef } from 'react';
import { Button, Dimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

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
        style={[{ ...style,width: '100%', }]}
        autoPlay={autoPlay}
        autoPlayInterval={isFast ? fastInterval : 2002}
        data={data}
        pagingEnabled={pagingEnabled}
        width={PAGE_WIDTH - componentWidth} // Full width minus any offset
        onSnapToItem={(index) => {
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
    </View>
  );
};

export default FullCarousel;
