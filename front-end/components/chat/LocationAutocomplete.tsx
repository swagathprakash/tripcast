import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Suggestion from '../Suggestion'
import { TOMTOM_API_KEY } from '@/constants/tomtom';
import axios from 'axios';

const LocationAutocomplete = ({ setAnswers, setLocation }: {
    setAnswers: React.Dispatch<React.SetStateAction<string>>; setLocation: React.Dispatch<React.SetStateAction<{
        address: string;
        lat: number;
        lon: number;
    } | undefined>>
}) => {

    let [suggestionListData, setSuggestionListData] = useState<Array<{ p1: string | null, p2: string | null, p3: string | null, address: string, lat: number, lon: number }>>([]);
    let [placeholder, setPlaceholder] = useState('Query e.g. Washington');
    let [showList, setShowList] = useState(false);

    const onPressItem = (item: { address: React.SetStateAction<string> }) => {
        setPlaceholder(item.address);
        setShowList(false);
    };

    const handleSearchTextChange = (changedSearchText: string) => {
        if (!changedSearchText || changedSearchText.length < 5) return;

        let baseUrl = `https://api.tomtom.com/search/2/search/${changedSearchText}.json?`;
        let searchUrl = baseUrl + `key=${TOMTOM_API_KEY}`;

        axios
            .get(searchUrl)
            .then((response) => {
                let addresses = response.data.results.map((v: { address: { freeformAddress: string }, position: { lat: number, lon: number } }) => {
                    let parts = v.address.freeformAddress.split(',');
                    return {
                        p1: parts.length > 0 ? parts[0] : null,
                        p2: parts.length > 1 ? parts[1] : null,
                        p3: parts.length > 2 ? parts[2] : null,
                        address: v.address.freeformAddress,
                        lat: v.position.lat,
                        lon: v.position.lon
                    };
                });

                setSuggestionListData(addresses);
                setShowList(true);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    };
    return (
        <Suggestion
            placeholder={placeholder}
            showList={showList}
            suggestionListData={suggestionListData}
            onPressItem={onPressItem}
            handleSearchTextChange={handleSearchTextChange}
            setAnswers={setAnswers}
            setLocation={setLocation}
        />
    )
}

export default LocationAutocomplete

const styles = StyleSheet.create({})