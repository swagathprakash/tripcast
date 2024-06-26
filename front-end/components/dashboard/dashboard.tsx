import { View, Text } from 'react-native'
import React from 'react'
import WeatherCard from './WeatherCard'
import Explore from './explore'

const Dashboard = () => {
  return (
    <View className=' w-full px-2'>
      <Text className='p-2 pt-4'>Welcome Mr Induchudan</Text>
      <WeatherCard/>
      <Explore/>
    </View>
  )
}

export default Dashboard