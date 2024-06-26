import { View, Text, ScrollView } from "react-native";
import React from "react";
import DetailsCard from "./DetailsCard";
const hotels = [
  {
    name: "The Lost Hostel",
    city: "Kochi",
    logitude: 76.24849714763953,
    latitude: 9.968347999999999,
    address:
      "The Lost Hostel, 2/227, Calvetty Road, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hostel",
      "building",
      "building.accommodation",
      "internet_access",
    ],
  },
  {
    name: "The Dunes Cochin",
    city: "Ernakulam",
    logitude: 76.28425475,
    latitude: 9.979267400000001,
    address:
      "The Dunes Cochin, Doraiswamy Iyer Road, Shenoys, Ernakulam - 682035, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "building",
      "building.accommodation",
      "internet_access",
    ],
  },
  {
    name: "HOTEL SEA VIEW IN",
    city: "Kochi",
    logitude: 76.2439946,
    latitude: 9.9732495,
    address:
      "HOTEL SEA VIEW IN, CC 1/170, Vypin - Pallippuram Road, Vypin, Kochi - 682508, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "highway",
      "highway.secondary",
      "internet_access",
      "internet_access.for_customers",
      "power",
    ],
  },
  {
    name: "Hotel Paulson Park",
    city: "Kochi",
    logitude: 76.2893428,
    latitude: 9.9690907,
    address:
      "Hotel Paulson Park, Carrier Station Road, Ernakulam South, Kochi - 682016, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "internet_access",
      "internet_access.free",
    ],
  },
  {
    name: "No 18 Hotel",
    city: "Kochi",
    logitude: 76.24446841833361,
    latitude: 9.967140950000001,
    address:
      "No 18 Hotel, KB Jacob Road, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "building",
      "building.accommodation",
      "internet_access",
      "wheelchair",
      "wheelchair.yes",
    ],
  },
  {
    name: "Holiday Inn Cochin",
    city: "Ernakulam",
    logitude: 76.3162773623236,
    latitude: 9.990441650000001,
    address:
      "Holiday Inn Cochin, 33/1739 A, Salem - Kochi - Kanyakumari Road, Pallinada, Ernakulam - 682028, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "building",
      "building.accommodation",
      "internet_access",
    ],
  },
  {
    name: "Cochin Seaport Hotel",
    city: "Kochi",
    logitude: 76.23724823231919,
    latitude: 9.9953606,
    address:
      "Cochin Seaport Hotel, Vypin - Pallippuram Road, Puthuvype, Kochi - 682508, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "building",
      "building.accommodation",
      "internet_access",
      "internet_access.for_customers",
    ],
  },
  {
    name: "Old Harbour Hotel",
    city: "Kochi",
    logitude: 76.2424837,
    latitude: 9.967342,
    address:
      "Old Harbour Hotel, 1/328, Tower Road, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "internet_access",
      "internet_access.free",
    ],
  },
  {
    name: "Zostel Kochi (Fort Kochi)",
    city: "Kochi",
    logitude: 76.24165435442612,
    latitude: 9.962485699999998,
    address:
      "Zostel Kochi (Fort Kochi), Vadathaza Lane, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hostel",
      "building",
      "building.accommodation",
      "internet_access",
      "internet_access.free",
    ],
  },
  {
    name: "ChristVille Home Stay",
    city: "Kochi",
    logitude: 76.24244784999999,
    latitude: 9.962828250000001,
    address:
      "ChristVille Home Stay, KL Bernard Master Road, Fort Kochi, Kochi - 682001, Kerala, India",
    categories: [
      "accommodation",
      "accommodation.hotel",
      "building",
      "building.accommodation",
    ],
  },
];
const Hotels = () => {
  return <DetailsCard data={hotels} />;
};

export default Hotels;
