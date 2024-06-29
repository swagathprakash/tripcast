import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import TripList from './TripList';
import { useAppDispatch, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { storeData } from '@/libs/utils';
import { clearUser } from '@/store/slice/authSlice';
import { router } from 'expo-router';
import LoginButtonCard from '../LoginButtonCard';
import { fetchAllItinaray } from '@/store/slice/itenararySlice';

const Saved = () => {
  const [tripTab, setTripTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [reload, setReload] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { upcoming, finished, loading } = useAppSelector((state) => state.itenrary);
  const dispatch = useAppDispatch();

  useEffect(() => {
    user && user.user_id && dispatch(fetchAllItinaray(user.user_id))
  }, [reload])
  return (
    <>
      {user ? (
        <View className="w-full justify-start h-full">
          {loading ? <ActivityIndicator /> : (
            <View>
              <TouchableOpacity className='items-end mb-2' onPress={()=>setReload(!reload)}>
                <Ionicons name="reload" size={24} color="#1f1e1e" />
              </TouchableOpacity>
              <TripList trips={tripTab === 'upcoming' ? upcoming : finished} />
            </View>
          )}
          <View className='w-full mt-2'>
            <TouchableOpacity className='x-2 mx-auto py-2 w-[50vw] rounded-full items-center justify-center bg-white border-[1px] border-primary opacity-80' onPress={() => setTripTab(tripTab === "upcoming" ? 'completed' : "upcoming")}>
              <Text className='text-primary text-lg text-center font-bold'>
                {tripTab === 'completed' ? "Upcoming trips" : "Finished trips"}
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