import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const TextCarousel = () => {
    const [index, setIndex] = useState<number>(0)
    const content = [
      {
        title: "Personalized Recommendations",
        description: "Receive tailored suggestions for activities, destinations, and packing essentials based on current and predicted weather conditions."
      },
      {
        title: "Real-Time Updates",
        description: "Stay informed with up-to-the-minute weather updates to plan your day effectively and make the most of your trip."
      },
      {
        title: "Enhanced User Experience",
        description: "Enjoy a user-friendly interface that simplifies travel planning, ensuring stress-free and enjoyable adventures."
      },
      {
        title: "Weather Alerts",
        description: "Receive alerts about weather changes to avoid disruptions and stay safe during your travels."
      }
    ]
    useEffect(() => {
      setTimeout(() => {
        setIndex((index + 1) % content.length)
      }, 5000)
  
    }, [index])
  return (

      <SafeAreaView>
          <View className='w-full h-[20vh] px-4 justify-start items-center mt-6'>
            <Text className='text-primary text-lg capitalize font-bold text-center'>{content[index].title}</Text>
            <Text className='text-primary text-base text-center'>{content[index].description}</Text>
          </View>
      </SafeAreaView>
  )
}

export default TextCarousel
