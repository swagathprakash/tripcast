import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const SuggestionListItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPressItem(props.item)}>
            <View style={styles.searchListItem}>
                <View style={styles.searchListItemIcon}>
                    <FontAwesome name="search" size={24} color="black" />
                </View>
                <View>
                    <Text style={styles.searchListItemTitle}>{props.item.p1}</Text>
                    {props.item.p2 && props.item.p3 ? <Text>{props.item.p2} {props.item.p3}</Text> : null}
                    {props.item.p2 && !props.item.p3 ? <Text>{props.item.p2}</Text> : null}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default SuggestionListItem;

const styles = StyleSheet.create({
    searchListItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    searchListItem: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: "row"
    },
    searchListItemTitle: {
        fontWeight: 'bold'
    }
});
