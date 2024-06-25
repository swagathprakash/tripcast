import { View, Text } from 'react-native'
import React from 'react'
import WeatherCard from './WeatherCard'

const Dashboard = () => {
  return (
    <View className=' w-full px-2'>
      <Text className='px-2'>Welcome Mr Induchudan</Text>
      <WeatherCard/>
    </View>
  )
}

export default Dashboard