import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";
import { icons } from "@/constants";
import BottomSheet, {
  BottomSheetView,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
const RideLayout = forwardRef(
  (
    {
      children,
      snapPoints,
      onBack,
    }: {
      children: React.ReactNode;
      snapPoints?: string[];
      onBack?: () => void;
    },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    useImperativeHandle(ref, () => ({
      close() {
        bottomSheetRef.current?.close();
      },
    }));
    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        if (Platform.OS === "android") {
          bottomSheetRef.current?.snapToIndex(1);
        }
      });
      return () => {
        showSubscription.remove();
      };
    }, []);
    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidHide", () => {
        if (Platform.OS === "android") {
          bottomSheetRef.current?.snapToIndex(0);
        }
      });
      return () => {
        showSubscription.remove();
      };
    }, []);
    return (
      <GestureHandlerRootView className="flex-1">
        <View className="absolute z-10 top-4 left-4 flex-row items-center">
          <TouchableOpacity
            className="bg-white justify-center items-center rounded-full w-[40px] h-[40px]"
            onPress={() => {
              router.back();
              onBack && onBack();
            }}
          >
            <Image source={icons.backArrow} className="w-[24px] h-[24px]" />
          </TouchableOpacity>
          <Text className="ml-[16px] text-[24px] leading-[28px] font-bold">
            Ride
          </Text>
        </View>
        <Map />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints ?? ["40%", "85%"]}
          index={0}
        >
          {children}
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
);

export default RideLayout;
