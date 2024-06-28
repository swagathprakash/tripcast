import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const TripList = ({ trips }: { trips: { destination: string; weatherForecast: { summary: string, averageTemperature: number }; tripId: number }[] }) => {
    return (
        <>
            {trips.map(({ destination, weatherForecast: { summary, averageTemperature }, tripId }) => (
                <View key={tripId} className="mb-10 bg-white shadow-md shadow-gray-500 rounded-md ">
                    <TouchableOpacity onPress={() => router.push(`/itenary-details?tripId=${tripId}`)}>
                        <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
                            <Text className="text-xl font-semibold text-primary">
                                {destination}
                            </Text>
                            <Text>{averageTemperature}°C</Text>
                        </View>
                        <View className='p-3'>
                            <Text>{summary}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </>
    )
}

export default TripList

const styles = StyleSheet.create({})