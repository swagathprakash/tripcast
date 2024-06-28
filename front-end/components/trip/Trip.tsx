import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'

const Trip = () => {
    return (
        <View className='justify-evenly items-center flex flex-1 max-h-[50vh]'>
            <View className=''>
                <Text className='text-primary text-base text-center'>Unlock a custom itinerary crafted around your interests, not bound by location. Let us ignite your next adventure!</Text>
                <CustomButton content='Discover by Destination' navigator='/chat-ui' parentStyle='mt-4 w-[70vw]' />
            </View>
            <View>
                <Text className='text-primary text-base text-center'>Create a personalized itinerary tailored to your chosen destination. Let's plan your adventure!</Text>
                <CustomButton content='Discover the Unexpected' navigator='/coming-soon' parentStyle='mt-4 w-[70vw]' />
            </View>
        </View>
    )
}

export default Trip

const styles = StyleSheet.create({})