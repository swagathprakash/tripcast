import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ItenaryDetails from "@/components/itenary/itenary-details";

const create = () => {
  return (
    <ScrollView className=" bg-slate-50">
      <ItenaryDetails />
    </ScrollView>
  );
};

export default create;

const styles = StyleSheet.create({});
