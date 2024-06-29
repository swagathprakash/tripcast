import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const ComingSoon = () => {
    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <ScrollView className="flex-1 bg-slate-50 py-5">
                <View className='my-10'>
                    <Text className='text-2xl text-primary font-semibold text-center'>Coming Soon</Text>
                    <Text className='text-xs text-gray-500 font-medium text-center mt-2'>Swpie left to go back</Text>
                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default ComingSoon
