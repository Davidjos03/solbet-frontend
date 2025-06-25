export const initialArray: IPlayer[] = Array.from({ length: 15 }, () => ({
    _id: "",
    user_id: {
        _id: "",
        username: "Waiting...",
        avatar: "avatar.svg",
        created_at: new Date(),
    },
    price: 0.00000,
}));

export const waiting: IWaiting = {
    _id: "",
    round: 0,
    won: 0,
    chance: 0,
    user_id: {
        _id: "",
        username: "Waiting...",
        avatar: "avatar.svg",
        created_at: new Date(),
    },
    create_at: new Date(),
}


// Format seconds into MM:SS
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
};

export const formatCompactNumber = (num: number): string => {
    if (num < 1000) return num.toFixed(2);
    if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K`;
    if (num < 1_000_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    return `${(num / 1_000_000_000).toFixed(2)}B`;
};

export const sleep = async (ms: number) => {
    await new Promise((resolve) => setTimeout(resolve, ms))
}

// utils/dateFormatter.ts
export const formatTransactionDate = (dateInput: Date | string | number): string => {
  // Convert to Date object if it isn't already
  const date = new Date(dateInput);
  
  // Format as "19:52 June, 24, 2025"
  return date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour12: false
  }).replace(',', ''); // Removes comma after month
};