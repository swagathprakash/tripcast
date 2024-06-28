import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const ComingSoon = () => {
    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <ScrollView className="flex-1 bg-slate-50 py-5">
                <View className='my-auto'>
                    <Text>ComingSoon</Text>
                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </SafeAreaView>
    )
}

export default ComingSoon
