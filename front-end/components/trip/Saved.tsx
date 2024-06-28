import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton';
import TripList from './TripList';
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { storeData } from '@/libs/utils';
import { clearUser } from '@/store/slice/authSlice';
import { router } from 'expo-router';

const Saved = () => {
  const [tripTab, setTripTab] = useState<'upcomming' | 'completed'>('upcomming')
  const upcommingTrips = [
    {
      tripId: 1,
      destination: "Wayanad",
      weatherForecast: {
        summary:
          "Enjoy a mix of sun and showers! Day 1 might see some evening rain, but Day 2 looks clear. Pack for both!",
        averageTemperature: 24.5,
      }
    },
    {
      tripId: 2,
      destination: "Banglore",
      weatherForecast: {
        summary:
          "Enjoy a mix of sun and showers! Day 1 might see some evening rain, but Day 2 looks clear. Pack for both!",
        averageTemperature: 24.5,
      }
    },
    {
      tripId: 3,
      destination: "Goa",
      weatherForecast: {
        summary:
          "Enjoy a mix of sun and showers! Day 1 might see some evening rain, but Day 2 looks clear. Pack for both!",
        averageTemperature: 24.5,
      }
    }]
  const completedTrips = [
    {
      tripId: 1,
      destination: "Varkala",
      weatherForecast: {
        summary:
          "Enjoy a mix of sun and showers! Day 1 might see some evening rain, but Day 2 looks clear. Pack for both!",
        averageTemperature: 24.5,
      }
    },
    {
      tripId: 2,
      destination: "Munar",
      weatherForecast: {
        summary:
          "Enjoy a mix of sun and showers! Day 1 might see some evening rain, but Day 2 looks clear. Pack for both!",
        averageTemperature: 24.5,
      }
    }]
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      {user ? (
        <View className="w-full p-5 justify-start h-full">
          <View>
            <TripList trips={tripTab === 'upcomming' ? upcommingTrips : completedTrips} />
          </View>
          <View className='w-full'>
            <TouchableOpacity className='x-2 mx-auto py-2 w-[50vw] rounded-full items-center justify-center bg-white border-[1px] border-primary opacity-80' onPress={() => setTripTab(tripTab === "upcomming" ? 'completed' : "upcomming")}>
              <Text className='text-primary text-lg text-center font-bold'>
                {tripTab === 'completed' ? "Upcomming trips" : "Finished trips"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>) : (
        <View className="m-3 bg-white shadow-md shadow-gray-500 rounded-md ">
          <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
            <Text className="text-xs font-semibold text-gray-500">
              Please login to create itenary
            </Text>
          </View>
          <View className="flex-1">
            <Pressable
              className="m-3 mb-5  bg-primary rounded-md shadow-md shadow-black justify-center py-2"
              onPress={() => {
                storeData("");
                dispatch(clearUser({}));
                router.push("/");
              }}
            >
              <Text className="w-full text-center text-white text-lg font-bold">
                Log In
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </>
  )
}

export default Saved

const styles = StyleSheet.create({})