import { View, TextInput, Pressable, Text } from "react-native";
import React, { useRef, useState } from "react";

const SearchBar = () => {
  const textRef = useRef<any>();
  const [value, setValue] = useState<string>("");

  return (
    <View className="h-12 w-full my-3 bg-white border-[1px] border-gray-300 shadow-md  shadow-gray-500 rounded-md pl-5 items-center justify-between flex-row">
      <TextInput
        ref={textRef}
        className="text-base flex-1 "
        placeholder="Search for destination"
        placeholderTextColor={"black"}
        value={value}
        onChangeText={(e) => {
          setValue(e);
        }}
      ></TextInput>
      {false && (
        <Pressable
          onPress={(e) => {
            setValue("");
            textRef.current.focus();
          }}
        >
          <Text className="text-primary px-5 font-semibold text-xl">X</Text>
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
