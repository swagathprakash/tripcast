import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { TripDetailsWithId } from '@/store/slice/itenararySlice'
import { icons } from '@/constants'

const TripList = ({ trips }: { trips: TripDetailsWithId[] | undefined }) => {
    return (
        <>
            {trips && trips.length > 0 ? (trips.map(({ destination, trip_id, purpose, companions, duration, start_date, end_date }) => (
                <View key={trip_id} className="mb-10 bg-white shadow-md shadow-gray-500 rounded-md ">
                    <TouchableOpacity onPress={() => router.push(`/itenary-details?tripId=${trip_id}`)}>
                        <View className="px-3 py-3 border-b-[1px] flex-row justify-between items-center border-b-gray-100">
                            <Text className="text-xl font-semibold text-primary">
                                {destination}
                            </Text>
                            <Text>{duration} {duration === 1 ? "day" : "days"}</Text>
                        </View>
                        <View className='p-3'>
                            <Text>{start_date} - {end_date}</Text>
                        </View>
                        <View className='p-3 flex flex-row justify-between'>
                            <Text>#{purpose}</Text>
                            <View className='flex flex-row'>
                                <Image
                                    source={companions === "Alone" ? icons.single : companions === "Friends" ? icons.friends : companions === "Couple" ? icons.couple : icons.family}
                                    resizeMode='cover'
                                    className='h-4 w-4'
                                />
                                <Text className='ml-2'>{companions}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ))) : (<View className=''><Text className='text-center'>No available trip data to show</Text></View>)}
        </>
    )
}

export default TripList
