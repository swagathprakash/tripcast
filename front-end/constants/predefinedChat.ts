export const chat: Array<{ id: number, bot: string, user: string, type: 'Select' | 'Question' | 'Search' | 'Date', choice?: string[], subTopic?: string }> = [
    { id: 1, bot: "Hi, Where do you wish to go?", user: "", type: "Search", subTopic: "Start" },
    { id: 2, bot: "Who are you going with", user: "", type: "Select", choice: ["Alone", "Friends", "Couple", "Family"] },
    { id: 3, bot: "When do you wish to go?", type: "Date", user: "", subTopic: "Start" },
    { id: 4, bot: "End date?", type: "Date", user: "", subTopic: "End" },
    { id: 5, bot: "How do you want to spend your time?", type: "Select", user: "", choice: ["Food", "Adventure", "Chill", "Peace", "Museums", "Shopping", "Religious", "Historic forts"] },
    { id: 6, bot: "Where are you coming from?", user: "", type: "Search", subTopic: "End" },
    { id: 7, bot: "Do you need to search for accommodation?", user: "", type: "Select", choice: ["Yes", "No"] },
    { id: 8, bot: "Mode of transportation?", user: "", type: "Select", choice: ["Car/Bike", "Bus", "Train", "Flight"] }
];