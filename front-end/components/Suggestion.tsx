import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import SuggestionListItem from './SuggestionListItem';

const Suggestion = ({ placeholder, showList, suggestionListData, onPressItem, handleSearchTextChange, setAnswers, setLocation }: {
    placeholder: string; showList: boolean; suggestionListData: {
        p1: string | null;
        p2: string | null;
        p3: string | null;
        address: string;
        lat: number;
        lon: number;
    }[]; onPressItem: (item: {
        address: React.SetStateAction<string>;
    }) => void; handleSearchTextChange: (changedSearchText: string) => void; setAnswers: React.Dispatch<React.SetStateAction<string>>; setLocation: React.Dispatch<React.SetStateAction<{
        address: string;
        lat: number;
        lon: number;
    } | undefined>>
}) => {
    const searchInputRef = useRef(null);

    const handleOnPressItem = (item: { address: string, lat: number, lon: number, p1: string, p2: string, p3: string }, event) => {
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
        onPressItem(item, event);
        console.log("On press", item);
        setAnswers(item.address)
        setLocation(item)

    };
//   const ref = useRef<FlatList>(null);
//     useEffect(() => {
//         ref.current?.scrollToIndex({ cu, animated: true, viewPosition: 0.5 });
//       }, [index]);
    return (
        <View style={styles.suggestionListContainer}>
            <TextInput
                ref={searchInputRef}
                className='bg-white text-primary border-[1px] border-primary w-[80vw] p-2 rounded-md'
                placeholder={placeholder}
                onChangeText={handleSearchTextChange}
            />
            {showList && (
                <FlatList
                    style={styles.searchList}
                    keyExtractor={(item, index) => index.toString()}
                    keyboardShouldPersistTaps="always"
                    initialNumToRender={5}
                    data={suggestionListData}
                    renderItem={({ item }) => (
                        <SuggestionListItem onPressItem={handleOnPressItem} item={item} />
                    )}
                />
            )}
        </View>
    );
};

export default Suggestion;

const styles = StyleSheet.create({
    searchButtons: {
        flexDirection: 'row',
        height: '10%',
        backgroundColor: '#fff',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        paddingLeft: 18,
        paddingRight: 18
    },
    suggestionListContainer: {
        width: "90%",
    },
    searchList: {
        width: "95%",
        marginTop: 10,
    }
});
