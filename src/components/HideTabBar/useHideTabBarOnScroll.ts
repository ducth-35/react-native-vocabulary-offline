import { useContext, useRef, useCallback } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { TabBarVisibilityContext } from "./BottomTabWrapper";
import { UseHideTabBarOnScrollReturn } from "./types";

interface UseHideTabBarOnScrollOptions {
  scrollThreshold?: number;
}

export const useHideTabBarOnScroll = (
  options: UseHideTabBarOnScrollOptions = {}
): UseHideTabBarOnScrollReturn => {
  const { scrollThreshold = 50 } = options;

  const context = useContext(TabBarVisibilityContext);

  if (!context) {
    throw new Error(
      "useHideTabBarOnScroll must be used within a TabBarVisibilityContext.Provider"
    );
  }

  const { slideTabBar } = context;
  const lastScrollY = useRef(0);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const direction = currentOffset > lastScrollY.current ? "down" : "up";

      if (Math.abs(currentOffset - lastScrollY.current) > scrollThreshold) {
        slideTabBar(direction);
        lastScrollY.current = currentOffset;
      }
    },
    [slideTabBar, scrollThreshold]
  );

  return { onScroll };
};
