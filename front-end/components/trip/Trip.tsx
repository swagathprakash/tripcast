import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'
import { router } from 'expo-router'

const Trip = () => {
    return (
        <View className='justify-evenly items-center flex flex-1 max-h-[50vh]'>
            <View className=''>
                <Text className='text-primary text-base text-center'>Unlock a custom itinerary crafted around your interests, not bound by location. Let us ignite your next adventure!</Text>
                <View>
                    <TouchableOpacity
                        className="x-2 mx-auto py-2 w-[70vw] rounded-md items-center justify-center bg-primary border-[1px] border-primary mt-4"
                        onPress={() => {
                            router.push("/chat-ui");
                        }}
                    >
                        <Text className="text-white text-lg text-center font-bold">
                            Discover by Destination
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text className='text-primary text-base text-center'>Create a personalized itinerary tailored to your chosen destination. Let's plan your adventure!</Text>
                <View>
                    <TouchableOpacity
                        className="x-2 mx-auto py-2 w-[70vw] rounded-md items-center justify-center bg-primary border-[1px] border-primary mt-5"
                        onPress={() => {
                            router.push("/coming-soon");
                        }}
                    >
                        <Text className="text-white text-lg text-center font-bold">
                        Discover the Unexpected
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Trip

const styles = StyleSheet.create({})