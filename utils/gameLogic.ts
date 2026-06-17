
export const getRank = (s: number) => {
    if (s >= 5000) return { label: 'S+', color: 'text-yellow-400' };
    if (s >= 2500) return { label: 'S', color: 'text-red-500' };
    if (s >= 1000) return { label: 'A', color: 'text-purple-500' };
    if (s >= 500) return { label: 'B', color: 'text-blue-500' };
    if (s >= 200) return { label: 'C', color: 'text-green-500' };
    return { label: 'D', color: 'text-gray-400' };
};
