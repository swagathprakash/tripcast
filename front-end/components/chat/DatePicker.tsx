import React, { SetStateAction, useState } from "react";
import { View, Pressable, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface MyDatePickerProps {
  setAnswers: React.Dispatch<React.SetStateAction<string>>;
  saveAnswer: (answer?: string) => void;
  maxDate: Date | undefined;
  setMaxDate: React.Dispatch<SetStateAction<Date | undefined>>;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  setAnswers,
  saveAnswer,
  maxDate,
  setMaxDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDateInternal] = useState(new Date()); // internal state for selected date
  const dateToday = new Date();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().slice(0, 10);
      setAnswers(formattedDate);
      setDateInternal(selectedDate);
      saveAnswer(formattedDate);
      const dateLimit = new Date(selectedDate);
      dateLimit.setDate(dateLimit.getDate() + 12);
      setMaxDate(dateLimit);
    }
  };
  return (
    <View className="flex-1 items-end justify-center  pr-2">
      <Pressable onPress={() => setShowPicker(true)}>
        <Text className="bg-white border-[1px] border-gray-300 rounded-md px-10 py-[10px] text-primary font-medium text-base">
          Select date
        </Text>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          accentColor="#1f1e1e"
          minimumDate={dateToday}
          maximumDate={maxDate}
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
