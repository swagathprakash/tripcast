import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { getCategory } from "@/libs/utils";
import { icons } from "@/constants";

const data = {
  destination: "Wayanad",
  travelCompanions: "Friends",
  duration: 2,
  purpose: "Chill",
  startingLocation: "Thrissur",
  forecast: [
    {
      time: "2024-07-01T08:00",
      weather_code: 17,
      weather: "Overcast",
    },
    {
      time: "2024-07-01T12:00",
      weather_code: 15,
      weather: "Overcast",
    },
    {
      time: "2024-07-01T14:00",
      weather_code: 0,
      weather: "Overcast",
    },
    {
      time: "2024-07-01T16:00",
      weather_code: 10,
      weather: "Light showers",
    },
    {
      time: "2024-07-01T18:00",
      weather_code: 10,
      weather: "Overcast",
    },
    {
      time: "2024-07-02T08:00",
      weather_code: 10,
      weather: "Overcast",
    },
    {
      time: "2024-07-02T09:00",
      weather_code: 10,
      weather: "Light showers",
    },
    {
      time: "2024-07-02T11:00",
      weather_code: 10,
      weather: "Partly cloudy",
    },
    {
      time: "2024-07-02T14:00",
      weather_code: 10,
      weather: "Overcast",
    },
  ],
  itinerary: [
    {
      day: 1,
      activities: [
        {
          time: "11:00",
          location: "Wayanad",
          description:
            "Arrive in Wayanad and check into a charming homestay nestled in the hills. Unpack and take in the scenic views.",
          weatherCondition: "Partly Cloudy",
        },
        {
          time: "12:00",
          location: "Local Restaurant",
          description:
            "Enjoy a relaxing lunch at a local restaurant, savouring Wayanad's traditional cuisine.",
          weatherCondition: "Partly Cloudy",
        },
        {
          time: "14:00",
          location: "Banasura Sagar Dam",
          description:
            "Visit the impressive Banasura Sagar Dam. Take a leisurely walk along the dam's top or opt for a peaceful boat ride on the reservoir, surrounded by stunning views.",
          weatherCondition: "Partly Cloudy",
        },
        {
          time: "17:00",
          location: "Wayanad Heritage Museum",
          description:
            "Immerse yourselves in the local history and culture at the Wayanad Heritage Museum. Learn about the region's tribal heritage and its fascinating past.",
          weatherCondition: "Partly Cloudy",
        },
        {
          time: "19:00",
          location: "Your Accommodation or Local Restaurant",
          description:
            "Enjoy a delicious dinner and relax as the evening might bring some showers. Opt for a cozy dinner at your homestay or venture out to a local restaurant if the rain holds back.",
          weatherCondition: "Possible Light Rain",
        },
      ],
    },
    {
      day: 2,
      activities: [
        {
          time: "09:00",
          location: "Your Accommodation",
          description:
            "Start your day with a refreshing breakfast, taking in the beauty of the clear skies.",
          weatherCondition: "Sunny",
        },
        {
          time: "10:00",
          location: "Chembra Peak (Optional)",
          description:
            "If you're up for an adventure, embark on a trek to Chembra Peak, the highest peak in Wayanad. The clear weather will offer breathtaking panoramic views (Remember to check local conditions and permits before heading out).",
          weatherCondition: "Sunny",
        },
        {
          time: "13:00",
          location: "Soochipara Falls",
          description:
            "Cool down with a visit to the cascading Soochipara Falls. Enjoy the refreshing spray and the lush green surroundings. (Water levels may be higher due to previous day's rain, so exercise caution.)",
          weatherCondition: "Sunny",
        },
        {
          time: "15:00",
          location: "Pookode Lake",
          description:
            "Spend a peaceful afternoon boating on the tranquil Pookode Lake. Surrounded by lush forests, it's the perfect spot to relax and enjoy the serene atmosphere.",
          weatherCondition: "Sunny",
        },
        {
          time: "18:00",
          location: "Local Market",
          description:
            "Before heading back, explore the local market for spices, tea, coffee, or handicrafts as souvenirs of your trip.",
          weatherCondition: "Partly Cloudy",
        },
        {
          time: "19:00",
          location: "Wayanad",
          description:
            "Depart from Wayanad with cherished memories of your relaxing getaway.",
          weatherCondition: "Partly Cloudy",
        },
      ],
    },
  ],
  packingRecommendations: [
    "Umbrella or a lightweight raincoat for possible showers on Day 1",
    "Comfortable walking or hiking shoes",
    "Light clothing for warm days",
    "A light sweater or jacket for cooler evenings",
    "Swimwear if you plan on taking a dip in waterfalls or lakes",
    "Sunscreen",
    "Hat",
    "Insect repellent",
    "Camera to capture the beauty of Wayanad",
    "Reusable water bottle to stay hydrated",
  ],
  safetyTips: [
    "Stay hydrated, especially during the warmer parts of the day.",
    "Apply and reapply sunscreen regularly.",
    "Use insect repellent, especially during the evenings.",
    "Be cautious while swimming in waterfalls or lakes, especially after rain.",
    "Check local weather updates and advisories, especially if you plan to trek.",
    "Respect the local environment and wildlife.",
  ],
};

const ItenaryDetails = () => {
  return (
    <>
      <Text className="text-4xl py-5 font-semibold text-primary px-5">
        {data.destination}
      </Text>
      <View className="px-3 py-5 flex-row gap-2 justify-start flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
        <View className=" w-36 my-2">
          <Text className="text-xs text-gray-400 font-medium">Companion</Text>
          <Text className="text-lg text-primary font-semibold">
            {data.travelCompanions}
          </Text>
        </View>
        <View className=" w-36 my-2">
          <Text className="text-xs text-gray-400 font-medium">Duration</Text>
          <Text className="text-lg text-primary font-semibold">
            {data.duration} days
          </Text>
        </View>
        <View className=" w-36 my-2">
          <Text className="text-xs text-gray-400 font-medium">Purpose</Text>
          <Text className="text-lg text-primary font-semibold">
            {data.purpose}
          </Text>
        </View>
        <View className=" w-36 my-2">
          <Text className="text-xs text-gray-400 font-medium">
            Starting location
          </Text>
          <Text className="text-lg text-primary font-semibold">
            {data.startingLocation}
          </Text>
        </View>
      </View>
      <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300">
        <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 w-full">
          <Text className="text-lg text-primary font-semibold ">Weather</Text>
        </View>
        <View className="flex-1 overflow-hidden p-5">
          <ScrollView horizontal className="flex-1 gap-4 pl-1 pb-[5px]">
            {data.forecast.map((item, index) => {
              const category = getCategory(item.weather_code);
              return (
                <View key={index} className="items-center justify-start pr-2">
                  <Text className="text-[10px] font-semibold text-gray-400">
                    {new Date(item.time).toLocaleDateString().slice(0, 5)}
                  </Text>
                  <Text className="text-xs font-semibold text-primary">
                    {item.time.split("T")[1]}
                  </Text>
                  <Image
                    className="h-10 w-10"
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
                  <Text
                    className={`text-center font-semibold text-[10px] text-gray-400 `}
                  >
                    {item?.weather}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
        <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 flex-1">
          <Text className="text-lg text-primary font-semibold">Itenary</Text>
        </View>
        <View className="py-3 px-5 flex-1 w-full ">
          <Pressable
            className="m-3 mb-5  bg-primary rounded-md shadow-md shadow-gray-500 justify-center py-2"
            onPress={() => {
              router.push("/itenary-day");
            }}
          >
            <Text className="w-full text-center text-white text-lg font-bold">
              View Details
            </Text>
          </Pressable>
          <Pressable
            className="m-3 mt-0 mb-5  bg-primary rounded-md shadow-md shadow-gray-500 justify-center py-2"
            onPress={() => {}}
          >
            <Text className="w-full text-center text-white text-lg font-bold">
              Download PDF
            </Text>
          </Pressable>
        </View>
      </View>
      <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
        <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 flex-1">
          <Text className="text-lg text-primary font-semibold">
            Packing Recommendations
          </Text>
        </View>
        <View className="py-3 px-5">
          {data.packingRecommendations.map((item, index) => {
            return (
              <View key={index} className="py-1 flex-row flex-1 items-start">
                <View className="rounded-full h-2 w-2 bg-gray-400 my-[5px] mr-1"></View>
                <Text className="text-xs text-gray-500  font-semibold ">
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View className=" flex-wrap m-3 bg-white rounded-md border-[1px] border-gray-100 shadow-md shadow-gray-300 ">
        <View className="border-b-[1px] border-b-gray-100 flex-row justify-between items-center py-2 px-5 flex-1">
          <Text className="text-lg text-primary font-semibold">
            Safety Tips
          </Text>
        </View>
        <View className="py-3 px-5">
          {data.safetyTips.map((item, index) => {
            return (
              <View
                key={index}
                className="py-1 flex-row flex-1 items-start mr-1"
              >
                <View className="rounded-full h-2 w-2 bg-gray-400 my-[5px] mr-1"></View>
                <Text className="text-xs text-gray-500  font-semibold ">
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default ItenaryDetails;
