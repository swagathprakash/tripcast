import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chat } from '@/constants/predefinedChat';
import LocationAutocomplete from './LocationAutocomplete';
import MyDatePicker from './DatePicker';
import { useAppDispatch } from '@/store';
import { generateItinaray } from '@/store/slice/itenararySlice';

const ChatFlow = () => {
    const dispatch = useAppDispatch();
    const [communication, setCommunication] = useState<Array<{ data: string, type: 'Question' | 'Answer' | 'Select' | 'Search', choice?: Array<string> }>>([{ data: "Hi, Where do you wish to go?", type: "Search" }]);
    const [currentQuestIndex, setCurrentQuestIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<string>('');
    const [startLocation, setStartLocation] = useState<{ address: string, lat: number, lon: number }>();
    const [endlocation, setEndLocation] = useState<{ address: string, lat: number, lon: number }>();
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().slice(0, 10));

    const saveAnswer = (answer?: string) => {
        // console.log("called");
        const finalAnswer = answer ? answer : answers;
        setCommunication((prev) => [...prev, { data: finalAnswer, type: "Answer" }]);
        setCurrentQuestIndex(currentQuestIndex + 1);
        currentQuestIndex < 7 && setCommunication((prev) => [...prev, {
            data: chat[currentQuestIndex + 1].bot,
            type: chat[currentQuestIndex + 1].type === 'Search' ? "Search" : chat[currentQuestIndex + 1].type === 'Select' ? "Select" : "Question",
            choice: chat[currentQuestIndex + 1].type === 'Select' ? chat[currentQuestIndex + 1].choice : []
        }]);
        setAnswers("");
        // console.log("communication", communication);
    };

    // console.log("communication", communication);
    // console.log("communication current quest index", communication[currentQuestIndex]);
    // console.log("chat", chat[currentQuestIndex]);
    // console.log("chat next", chat[currentQuestIndex + 1]);
    const sendResponse = () => {
        console.log("Send response");
        console.log("response", communication);
        console.log("start loc", startLocation);
        console.log("en dloc", endlocation);
        dispatch(generateItinaray())
    }

    return (
        <SafeAreaView className="flex-1">
            <ScrollView className='bg-slate-50'>
                <View className="w-full px-5 justify-between h-full flex-1 bg-slate-50">
                    <View>
                        {communication.map(({ data, type, choice }) => (
                            <View key={data + type}>
                                <Text style={styles.text} className={`${type === 'Question' || type === 'Search' || type === 'Select' ? 'w-[180px] bg-primary p-3 text-white rounded-2xl rounded-tl-none my-2' : 'self-end w-20 p-3 min-w-[30px] bg-[#51625A] text-white rounded-2xl rounded-tr-none'}`}>{data}</Text>
                                <View className='flex flex-row flex-wrap'>
                                    {choice && choice.length > 0 && choice.map((option) => (
                                        <Pressable key={option} onPress={() => saveAnswer(option)} className='w-[90px] bg-primary p-3 text-white rounded-2xl m-2'>
                                            <Text className='text-white'>{option}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                    {currentQuestIndex < 8 && <View className='flex flex-row my-2 w-full mx-auto'>
                        {chat[currentQuestIndex].type === 'Question' && (
                            <TextInput value={answers} placeholder='Message tripcast' multiline={true} className='bg-white text-primary border-[1px] border-primary w-[80vw] p-2 rounded-md' onChangeText={(val) => setAnswers(val)} />
                        )}
                        {chat[currentQuestIndex].type === 'Search' && (
                            <LocationAutocomplete setAnswers={setAnswers} setLocation={chat[currentQuestIndex].subTopic === "Start" ? setStartLocation : setEndLocation} />
                        )}
                        {chat[currentQuestIndex].type === 'Date' && (
                            <MyDatePicker setAnswers={setAnswers} setDate={chat[currentQuestIndex].subTopic === "Start" ? setStartDate : setEndDate} />
                        )}
                        {chat[currentQuestIndex].type !== 'Select' && (
                            <Pressable className='mx-2 bg-white text-primary border-[1px] border-primary w-fit p-3 rounded-md h-fit self-start' onPress={() => saveAnswer()}>
                                <Text>+</Text>
                            </Pressable>
                        )}
                    </View>}
                </View>
                {currentQuestIndex === 8 && <View className='mb-40 mt-10'>
                    <TouchableOpacity className='x-2 mx-auto py-2 w-[50vw] rounded-md items-center justify-center bg-white border-[1px] border-primary opacity-80' onPress={sendResponse}>
                        <Text className='text-primary text-lg text-center font-bold'>Generate itinerary</Text>
                    </TouchableOpacity>
                </View>}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChatFlow;

const styles = StyleSheet.create({
    text: {
        textShadowColor: "#1f1e1e",
        textShadowOffset: { height: 1, width: 1 },
        textShadowRadius: 4,
    }
});
