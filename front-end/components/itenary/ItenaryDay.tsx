import { View, Text } from "react-native";
import React, { useState } from "react";
import ItenaryDayHeader from "./ItenaryDayHeader";
import ItenaryBody from "./ItenaryBody";

const itenary = [
  {
    day: 1,
    activities: [
      {
        time: "11:00",
        location: "Wayanad",
        weather_code: 10,
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
        weather_code: 10,
      },
      {
        time: "14:00",
        location: "Banasura Sagar Dam",
        description:
          "Visit the impressive Banasura Sagar Dam. Take a leisurely walk along the dam's top or opt for a peaceful boat ride on the reservoir, surrounded by stunning views.",
        weatherCondition: "Partly Cloudy",
        weather_code: 10,
      },
      {
        time: "17:00",
        location: "Wayanad Heritage Museum",
        description:
          "Immerse yourselves in the local history and culture at the Wayanad Heritage Museum. Learn about the region's tribal heritage and its fascinating past.",
        weatherCondition: "Partly Cloudy",
        weather_code: 10,
      },
      {
        time: "19:00",
        location: "Your Accommodation or Local Restaurant",
        description:
          "Enjoy a delicious dinner and relax as the evening might bring some showers. Opt for a cozy dinner at your homestay or venture out to a local restaurant if the rain holds back.",
        weatherCondition: "Possible Light Rain",
        weather_code: 10,
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
        weather_code: 10,
      },
      {
        time: "10:00",
        location: "Chembra Peak (Optional)",
        description:
          "If you're up for an adventure, embark on a trek to Chembra Peak, the highest peak in Wayanad. The clear weather will offer breathtaking panoramic views (Remember to check local conditions and permits before heading out).",
        weatherCondition: "Sunny",
        weather_code: 10,
      },
      {
        time: "13:00",
        location: "Soochipara Falls",
        description:
          "Cool down with a visit to the cascading Soochipara Falls. Enjoy the refreshing spray and the lush green surroundings. (Water levels may be higher due to previous day's rain, so exercise caution.)",
        weatherCondition: "Sunny",
        weather_code: 10,
      },
      {
        time: "15:00",
        location: "Pookode Lake",
        description:
          "Spend a peaceful afternoon boating on the tranquil Pookode Lake. Surrounded by lush forests, it's the perfect spot to relax and enjoy the serene atmosphere.",
        weatherCondition: "Sunny",
        weather_code: 10,
      },
      {
        time: "18:00",
        location: "Local Market",
        description:
          "Before heading back, explore the local market for spices, tea, coffee, or handicrafts as souvenirs of your trip.",
        weatherCondition: "Partly Cloudy",
        weather_code: 10,
      },
      {
        time: "19:00",
        location: "Wayanad",
        description:
          "Depart from Wayanad with cherished memories of your relaxing getaway.",
        weatherCondition: "Partly Cloudy",
        weather_code: 10,
      },
    ],
  },
];

const ItenaryDay = () => {
  const [dayIndex, setDayIndex] = useState<number>(0);
  return (
    <View className="flex-1">
      <Text className="text-primary font-semibold text-3xl my-5 pt-3 mx-3">
        Wayanad
      </Text>
      <ItenaryDayHeader
        dayIndex={dayIndex}
        length={itenary.length}
        setDayIndex={setDayIndex}
      />
      <ItenaryBody index={dayIndex} sections={itenary} />
    </View>
  );
};

export default ItenaryDay;
