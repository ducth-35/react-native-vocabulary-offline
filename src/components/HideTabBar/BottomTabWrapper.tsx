import React, { createContext, useRef, ReactNode } from "react";
import { Animated } from "react-native";
import { TabBarContextType, TabBarProviderProps, AnimationConfig } from "./types";

export const TabBarVisibilityContext = createContext<
  TabBarContextType | undefined
>(undefined);

interface BottomTabWrapperProps extends TabBarProviderProps {
  animationConfig?: AnimationConfig;
}

export const BottomTabWrapper: React.FC<TabBarProviderProps> = ({
  children,
}) => {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;

  const slideTabBar = (direction: "up" | "down") => {
    Animated.timing(tabBarTranslateY, {
      toValue: direction === "up" ? 0 : 100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TabBarVisibilityContext.Provider
      value={{
        tabBarTranslateY,
        slideTabBar,
      }}
    >
      {children}
    </TabBarVisibilityContext.Provider>
  );
};
