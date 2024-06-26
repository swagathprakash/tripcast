import { View, Text } from "react-native";
import React from "react";
import DetailsCard from "./DetailsCard";
const traditions = [
  {
    name: "Mattancherry Paradesi Synagogue",
    city: "Kochi",
    logitude: 76.25930174999999,
    latitude: 9.95748265,
    address:
      "Mattancherry Paradesi Synagogue, Palace Road, Mattancherry, Kochi - 628002, Kerala, India",
    categories: [
      "building",
      "building.historic",
      "building.place_of_worship",
      "building.tourism",
      "religion",
      "religion.place_of_worship",
      "religion.place_of_worship.judaism",
      "tourism",
      "tourism.attraction",
      "tourism.sights",
      "tourism.sights.place_of_worship",
      "tourism.sights.place_of_worship.synagogue",
    ],
  },
  {
    name: "Vallarpadam Church",
    city: "Ernakulam",
    logitude: 76.24999799953201,
    latitude: 9.9901316,
    address:
      "The Basilica of Our Lady of Ransom, Goshree Road, Vallarpadam, Ernakulam - 682510, Kerala, India",
    categories: [
      "building",
      "building.place_of_worship",
      "religion",
      "religion.place_of_worship",
      "religion.place_of_worship.christianity",
    ],
  },
  {
    name: "St. George Orthodox Koonan Kurish Church",
    city: "Kochi",
    logitude: 76.2540872061146,
    latitude: 9.963128600000001,
    address:
      "St. George Orthodox Koonan Kurish Church, New Road, Mattancherry, Kochi - 682002, Kerala, India",
    categories: [
      "religion",
      "religion.place_of_worship",
      "religion.place_of_worship.christianity",
    ],
  },
  {
    name: "Pavakulam Sree Mahadeva Kshetram",
    city: "Ernakulam",
    logitude: 76.29174999617625,
    latitude: 9.99637495,
    address:
      "Pavakulam Sree Mahadeva Kshetram, Pavakkulam Temple Road, Kaloor, Ernakulam - 682017, Kerala, India",
    categories: [
      "building",
      "building.place_of_worship",
      "religion",
      "religion.place_of_worship",
      "religion.place_of_worship.hinduism",
    ],
  },
];

const Tradition = () => {
  return <DetailsCard data={traditions} />;
};

export default Tradition;
