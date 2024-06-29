import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../CustomButton';
import TripList from './TripList';
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { storeData } from '@/libs/utils';
import { clearUser } from '@/store/slice/authSlice';
import { router } from 'expo-router';
import LoginButtonCard from '../LoginButtonCard';

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
        <View className='my-10'>
          <LoginButtonCard headerText='Please login to view saved trips'/>
        </View>
      )}
    </>
  )
}

export default Saved

const styles = StyleSheet.create({})