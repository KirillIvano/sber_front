const formatTimePart = (time: number) =>
    String(time.toFixed(0)).padStart(2, '0');

export const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${formatTimePart(hours)} : ${formatTimePart(minutes)} : ${formatTimePart(seconds)}`;
};
