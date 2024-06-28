import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SuggestionListItem = (props: any) => {
  return (
    <TouchableOpacity
      key={+props.item.p2 + props.item.p3}
      onPress={() => props.onPressItem(props.item)}
      className="h-[60px]"
    >
      <View
        style={styles.searchListItem}
        className="items-start border-b-[1px] border-b-gray-100 h-[60px] pt-3 flex-row"
      >
        <View style={styles.searchListItemIcon} className="">
          <FontAwesome name="search" size={20} color="#6b7280" />
        </View>
        <View>
          <Text style={styles.searchListItemTitle} className="text-primary ">
            {props.item.p1}
          </Text>
          {props.item.p2 && props.item.p3 ? (
            <Text className="text-gray-500 font-medium">
              {props.item.p2} {props.item.p3}
            </Text>
          ) : null}
          {props.item.p2 && !props.item.p3 ? (
            <Text className="text-gray-500 font-medium">{props.item.p2}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestionListItem;

const styles = StyleSheet.create({
  searchListItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  searchListItem: {},
  searchListItemTitle: {
    fontWeight: "bold",
  },
});
