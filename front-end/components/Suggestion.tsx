import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import SuggestionListItem from "./SuggestionListItem";

const Suggestion = ({
  placeholder,
  showList,
  suggestionListData,
  onPressItem,
  handleSearchTextChange,
  setAnswers,
  setLocation,
}: {
  placeholder: string;
  showList: boolean;
  suggestionListData: {
    p1: string | null;
    p2: string | null;
    p3: string | null;
    address: string;
    lat: number;
    lon: number;
  }[];
  onPressItem: (item: { address: React.SetStateAction<string> }) => void;
  handleSearchTextChange: (changedSearchText: string) => void;
  setAnswers: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<
    React.SetStateAction<
      | {
          address: string;
          lat: number;
          lon: number;
        }
      | undefined
    >
  >;
}) => {
  const searchInputRef = useRef<any>(null);

  const handleOnPressItem = (
    item: {
      address: string;
      lat: number;
      lon: number;
      p1: string;
      p2: string;
      p3: string;
    },
    event
  ) => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    onPressItem(item, event);
    setAnswers(item.address);
    setLocation(item);
  };
  //   const ref = useRef<FlatList>(null);
  //     useEffect(() => {
  //         ref.current?.scrollToIndex({ cu, animated: true, viewPosition: 0.5 });
  //       }, [index]);
  return (
    <View>
      <TextInput
        ref={searchInputRef}
        className="bg-white  text-primary border-[1px] border-gray-300 w-[75vw] py-2 px-3 mr-2 rounded-md"
        placeholder={placeholder}
        placeholderTextColor={"#6b7280"}
        onChangeText={handleSearchTextChange}
      />
      {showList && (
        <View
          style={styles.searchList}
          className="bg-white border-[1px] border-gray-200 rounded-md max-w-[75vw] mt-1 max-h-[240px] overflow-hidden"
        >
          {suggestionListData.map((item, index) => {
            if (index < 4) {
              return (
                <SuggestionListItem
                  key={`${index}${item.p1}`}
                  onPressItem={handleOnPressItem}
                  item={item}
                />
              );
            }
          })}
        </View>
      )}
    </View>
  );
};

export default Suggestion;

const styles = StyleSheet.create({
  searchButtons: {
    flexDirection: "row",
    height: "10%",
    backgroundColor: "#fff",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    paddingLeft: 18,
    paddingRight: 18,
  },

  searchList: {},
});
