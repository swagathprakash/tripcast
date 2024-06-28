import React, { useState } from 'react';
import { Button, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MyDatePickerProps {
    setAnswers: React.Dispatch<React.SetStateAction<string>>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({ setAnswers, setDate }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDateInternal] = useState(new Date()); // internal state for selected date

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().slice(0, 10);
            setDate(formattedDate);
            setAnswers(formattedDate);
            setDateInternal(selectedDate); // update internal state
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Open Date Picker" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={date} // initial value (current date)
                    mode="date" // choose 'date' for date picker
                    display="default" // Android only, 'default' or 'spinner'
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default MyDatePicker;
