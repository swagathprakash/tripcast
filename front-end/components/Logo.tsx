import { Image, View } from 'react-native'
import React from 'react'
import { images } from "./../constants"
import { Link } from 'expo-router'

const Logo = ({ skip = false }: { skip?: boolean }) => {
    return (
        <View className={`flex-row justify-between items-center px-2`}>
            <Image
                source={images.logo}
                className="w-[130px] h-fit"
                resizeMode="contain"
            />
            {skip && <Link href='/home' className='text-right px-3 font-bold text-primary'>Skip</Link>}
        </View>
    )
}

export default Logo
