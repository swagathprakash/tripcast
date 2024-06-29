import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TabBar from '../locationTab/tabBar'
import Trip from './Trip';
import Saved from './Saved';

const TripPage = () => {
    const sectionLabel = ["Trip", "Saved"];
    const sectionBody = [<Trip />, <Saved />];
    return (
        <View className="w-full p-5 justify-start h-full">
            <View>
                <Text className="text-primary text-xl font-bold">Trip Planning</Text>
                <Text className='text-gray-600 text-justify text-sm font-medium my-2'>Create memories, embrace adventures, and discover the world like never before with our personalized travel itinerary app.</Text>
            </View>
            <View className='w-full'>
                <TabBar sectionLabel={sectionLabel} sectionBody={sectionBody} page='plan' />
            </View>
        </View>
    )
}

export default TripPage

const styles = StyleSheet.create({})