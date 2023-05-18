export interface Message {
    id: string;
    heading: string;
    content: string;
    data: {
        timestamp: number;
    }
};
