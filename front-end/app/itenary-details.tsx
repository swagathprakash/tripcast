import { ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ItenaryDetails from '@/components/itenary/itenary-details'
import { useLocalSearchParams } from 'expo-router'

const ItenaryDays = () => {
    const { tripId } = useLocalSearchParams();
    
    return (
        <SafeAreaView>
            <ScrollView className="min-h-screen">
                <ItenaryDetails tripId={tripId} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ItenaryDays
