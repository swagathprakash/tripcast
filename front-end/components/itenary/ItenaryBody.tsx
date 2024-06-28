import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import { getCategory } from "@/libs/utils";
import { icons } from "@/constants";

type Activity = {
  time: string;
  location: string;
  description: string;
  weatherCondition: string;
  weather_code: number;
};

type Itenary = {
  day: number;
  activities: Activity[];
};

const ItenaryBody = ({
  index,
  sections,
}: {
  index: number;
  sections: Itenary[];
}) => {
  const currentIndex = index;
  const ref = useRef<FlatList>(null);
  useEffect(() => {
    ref.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  }, [index]);
  return (
    <FlatList
      ref={ref}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={index}
      className=""
      horizontal
      data={sections}
      renderItem={({ item, index }: { item: Itenary; index: number }) => {
        const BodyIndex = index;
        const selection = BodyIndex == currentIndex;
        return (
          <View className={`  w-[100vw] mb-5  ${!selection && "max-h-[74vh]"}`}>
            <View className="bg-white mx-2 p-3 flex-1 rounded-sm border-[1px] border-gray-200 border-t-white ">
              <View className="flex-1 mt-3 py-[9px] relative">
                <View className="h-[9px] w-[9px] border-2 border-gray-500 rounded-full absolute top-0 left-[76px]"></View>
                <View className="h-[9px] w-[9px] border-2 border-gray-500 rounded-full absolute bottom-0 left-[76px]"></View>
                {item.activities.map((item, index) => {
                  const category = getCategory(item.weather_code);
                  return (
                    <View
                      key={index}
                      className={` flex-1 relative flex-row gap-[1px] ${
                        index && "border-t-[1px] border-t-gray-200"
                      } `}
                    >
                      <View className="h-[10px] w-[10px] bg-gray-500 border-[1px] border-white rounded-full absolute top-[14px] z-10 left-[75px]"></View>
                      <View className="justify-start items-center pr-3 w-20 border-r-2 border-r-gray-300 pb-2 pt-1 ">
                        <Text className="text-primary font-semibold text-lg text-center">
                          {item.time}
                        </Text>
                        <Image
                          className="h-8 w-8"
                          resizeMode="contain"
                          source={
                            category === "Sunny"
                              ? icons.Sunny
                              : category === "Cloudy"
                              ? icons.Cloudy
                              : category === "Rainy"
                              ? icons.Rainy
                              : icons.Thunderstorm
                          }
                        />
                        <Text className="  text-gray-500 font-medium text-[9px] text-center ">
                          {item.weatherCondition}
                        </Text>
                      </View>
                      <View className="justify-start flex-1 items-start pl-3  border-l-2 border-l-gray-400 pb-3 pt-1 ">
                        <Text className="text-primary font-semibold text-lg ">
                          {item.location}
                        </Text>
                        <Text className="  text-gray-500 font-medium text-[10px] text-justify pt-1 ">
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

export default ItenaryBody;
