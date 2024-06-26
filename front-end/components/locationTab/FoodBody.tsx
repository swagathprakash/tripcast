import { View, Text } from "react-native";
import React from "react";
import DetailsCard from "./DetailsCard";
const foods = [
  {
    name: "Mash Resto-Cafe",
    city: "Ernakulam",
    logitude: 76.2840712,
    latitude: 9.9630007,
    address:
      "Mash Resto-Cafe, Foreshore Road, Ernakulam South, Ernakulam - 682016, Kerala, India",
    categories: [
      "catering",
      "catering.restaurant",
      "internet_access",
      "vegetarian",
    ],
  },
  {
    name: "Pizza Hut",
    city: "Kochi",
    logitude: 76.2445416,
    latitude: 9.9676795,
    address:
      "Pizza Hut, KB Jacob Road, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "catering",
      "catering.restaurant",
      "catering.restaurant.pizza",
    ],
  },
  {
    name: "The Renai Cochin",
    city: "Ernakulam",
    logitude: 76.3057104230875,
    latitude: 10.0053678,
    address:
      "The Renai Cochin, Old NH 47, Palarivattom, Ernakulam - 682025, Kerala, India",
    categories: [
      "building",
      "building.catering",
      "catering",
      "catering.restaurant",
    ],
  },
  {
    name: "Brindhavan Restaurant",
    city: "Kochi",
    logitude: 76.31427463108491,
    latitude: 9.995390449999999,
    address:
      "Brindhavan Restaurant, Salem - Kochi - Kanyakumari Road, Pallinada, Kochi - 680019, Kerala, India",
    categories: [
      "building",
      "building.catering",
      "catering",
      "catering.restaurant",
      "catering.restaurant.indian",
      "vegetarian",
    ],
  },
  {
    name: "Kashi Art Cafe",
    city: "Kochi",
    logitude: 76.24302546051928,
    latitude: 9.9666408,
    address:
      "Kashi Art Cafe, Burgher Street, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "building",
      "building.catering",
      "catering",
      "catering.cafe",
      "internet_access",
    ],
  },
  {
    name: "Café Crafters",
    city: "Kochi",
    logitude: 76.2603773,
    latitude: 9.9565021,
    address:
      "Café Crafters, VI/141, Jetthy Road, Mattancherry, Kochi - 628002, Kerala, India",
    categories: ["catering", "catering.cafe"],
  },
];

const Food = () => {
  return <DetailsCard data={foods} />;
};

export default Food;
