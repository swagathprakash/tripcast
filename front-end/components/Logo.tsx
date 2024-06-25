import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "./../constants"
import { Link } from 'expo-router'

const Logo = () => {
    return (
        <SafeAreaView className='-mt-14'>
            <View className="flex-row justify-between items-center mx-2">
                <Image
                    source={images.logo}
                    className="w-[130px] h-[84px]"
                    resizeMode="contain"
                />
                <Link href='/home' className='text-right p-3 font-bold text-primary'>Skip</Link>
            </View>
        </SafeAreaView>
    )
}

export default Logo

const styles = StyleSheet.create({})