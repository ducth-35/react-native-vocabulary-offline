import { ReactNode } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export interface TabBarContextType {
  tabBarTranslateY: Animated.Value;
  slideTabBar: (direction: "up" | "down") => void;
}

export interface TabBarProviderProps {
  children: ReactNode;
}

export interface UseHideTabBarOnScrollReturn {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export type SlideDirection = "up" | "down";

export interface AnimationConfig {
  duration?: number;
  hideValue?: number;
  showValue?: number;
  scrollThreshold?: number;
}
