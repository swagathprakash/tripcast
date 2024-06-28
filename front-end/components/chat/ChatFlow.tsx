import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { chat } from "@/constants/predefinedChat";
import LocationAutocomplete from "./LocationAutocomplete";
import MyDatePicker from "./DatePicker";
import { useAppDispatch } from "@/store";
import { generateItinaray } from "@/store/slice/itenararySlice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ChatFlow = () => {
  const dispatch = useAppDispatch();
  const [maxDate,setMaxDate]=useState<Date|undefined>()
  const [communication, setCommunication] = useState<
    Array<{
      data: string;
      type: "Question" | "Answer" | "Select" | "Search";
      choice?: Array<string>;
    }>
  >([{ data: "Hi, Where do you wish to go?", type: "Search" }]);
  const [currentQuestIndex, setCurrentQuestIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string>("");
  const [startLocation, setStartLocation] = useState<{
    address: string;
    lat: number;
    lon: number;
  }>();
  const [endlocation, setEndLocation] = useState<{
    address: string;
    lat: number;
    lon: number;
  }>();

  const saveAnswer = (answer?: string) => {
    const finalAnswer = answer ? answer : answers;
    setCommunication((prev) => [
      ...prev,
      { data: finalAnswer, type: "Answer" },
    ]);
    setCurrentQuestIndex(currentQuestIndex + 1);
    currentQuestIndex < 7 &&
      setCommunication((prev) => [
        ...prev,
        {
          data: chat[currentQuestIndex + 1].bot,
          type:
            chat[currentQuestIndex + 1].type === "Search"
              ? "Search"
              : chat[currentQuestIndex + 1].type === "Select"
              ? "Select"
              : "Question",
          choice:
            chat[currentQuestIndex + 1].type === "Select"
              ? chat[currentQuestIndex + 1].choice
              : [],
        },
      ]);
    setAnswers("");
  };

  const sendResponse = () => {
    router.push("/itenary-details")
        const answers = communication.filter(({ type }) => type === "Answer")
        dispatch(generateItinaray({
            latitude: endlocation?.lat,
            longitude: endlocation?.lon,
            companions: answers[1].data,
            destination: answers[0].data,
            start_date: answers[2].data,
            end_date: answers[3].data,
            purpose: answers[4].data,
            starting_location: answers[5].data,
            mode_of_transport: answers[7].data,
        }))
  };

  return (
    <>
      <View className=" px-4 justify-between ">
        <View>
          {communication.map(({ data, type, choice }, index) => {
            return (
              <View key={data + type + currentQuestIndex + index}>
                <Text
                  style={styles.text}
                  className={`${
                    type === "Question" ||
                    type === "Search" ||
                    type === "Select"
                      ? "max-w-[200px] w-fit bg-primary px-3 py-2 text-white font-medium  rounded-xl rounded-tl-none my-2"
                      : "self-end max-w-[200px] px-3 py-2 min-w-[30px] bg-[#51625A] text-white font-medium rounded-xl rounded-tr-none"
                  }`}
                >
                  {data}
                </Text>
                <View
                  className={`flex flex-row flex-wrap ${false && "hidden"} `}
                >
                  {choice &&
                    choice.length > 0 &&
                    choice.map((option) => (
                      <Pressable
                        key={option}
                        onPress={() => saveAnswer(option)}
                        className="w-fit bg-white py-2 px-3 border-[1px] border-gray-300 rounded-lg mx-1 my-2"
                      >
                        <Text className="text-primary font-medium">
                          {option}
                        </Text>
                      </Pressable>
                    ))}
                </View>
              </View>
            );
          })}
        </View>
        {currentQuestIndex < 8 && (
          <View className=" flex-row my-2 ">
            {chat[currentQuestIndex].type === "Question" && (
              <TextInput
                value={answers}
                placeholder="Message tripcast"
                multiline={true}
                className="bg-white text-primary border-[1px] border-primary w-[80vw] p-2 rounded-md"
                onChangeText={(val) => setAnswers(val)}
              />
            )}
            {chat[currentQuestIndex].type === "Search" && (
              <LocationAutocomplete
                saveAnswer={saveAnswer}
                setAnswers={setAnswers}
                setLocation={
                  chat[currentQuestIndex].subTopic === "Start"
                    ? setStartLocation
                    : setEndLocation
                }
              />
            )}
            {chat[currentQuestIndex].type === "Date" && (
              <MyDatePicker setMaxDate={setMaxDate} maxDate={maxDate} saveAnswer={saveAnswer} setAnswers={setAnswers} />
            )}
            {chat[currentQuestIndex].type === "Search" && (
              <Pressable
                className=" bg-white border-[1px] border-gray-300 text-primary w-fit py-3 px-4 rounded-md h-fit self-start"
                onPress={() => saveAnswer()}
                disabled={!answers}
              >
                <Ionicons name="send" size={20} color="#1f1e1e" />
              </Pressable>
            )}
          </View>
        )}
      </View>
      {currentQuestIndex === 8 && (
        <View className="mb-40 mt-10">
          <TouchableOpacity
            className="x-2 mx-auto py-2 w-[50vw] rounded-md items-center justify-center bg-white border-[1px] border-primary opacity-80"
            onPress={sendResponse}
          >
            <Text className="text-primary text-lg text-center font-bold">
              Generate itinerary
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ChatFlow;

const styles = StyleSheet.create({
  text: {
    textShadowColor: "#1f1e1e",
    textShadowOffset: { height: 1, width: 1 },
    textShadowRadius: 4,
  },
});
