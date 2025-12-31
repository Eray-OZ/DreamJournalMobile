import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming, 
  withDelay,
  Easing 
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface WavyUnderlineProps {
  color?: string;
  duration?: number;
  delay?: number;
}

export const WavyUnderline: React.FC<WavyUnderlineProps> = ({ 
  color = colors.primaryLight, 
  duration = 1000,
  delay = 500
}) => {
  const progress = useSharedValue(100); // 100 means hidden (dashoffset = length)

  useEffect(() => {
    progress.value = withDelay(delay, withTiming(0, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }));
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: progress.value,
    };
  });

  return (
    <Svg
      height="8"
      width="100%"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: -6, left: 0 }}
    >
      <AnimatedPath
        d="M0 5 Q50 10 100 5"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeDasharray="100"
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
