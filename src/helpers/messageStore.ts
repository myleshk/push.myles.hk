import { Message } from "../types";

interface StoredMessage extends Message {
    previousKey: string | null;
}

function generateKey(message: Message): string {
    return `message_${message.id}`
}

function getLastKey(): string | null {
    return localStorage.getItem('lastKey');
}

function setLastKey(key: string) {
    localStorage.setItem('lastKey', key);
}

function setItem(currentKey: string, message: Message, previousKey: string | null) {
    localStorage.setItem(currentKey, JSON.stringify({
        ...message,
        previousKey,
    }));
}

function getItem(key: string): StoredMessage {
    const rawItem = localStorage.getItem(key);
    if (!rawItem) {
        throw new Error(`No message found for key ${key}`);
    }
    return JSON.parse(rawItem);
}

export function addMessage(message: Message) {
    const currentKey = generateKey(message);
    setItem(currentKey, message, getLastKey());
    setLastKey(currentKey);
}

export function getAllMessages(): Message[] {
    let previousKey = getLastKey();

    const messages: Message[] = [];
    while (previousKey) {
        const { previousKey: _previousKey, ...message } = getItem(previousKey);
        messages.push(message)
        previousKey = _previousKey;
    }

    return messages;
}