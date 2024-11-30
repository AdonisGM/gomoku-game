import { io } from 'socket.io-client';

let ENDPOINT = import.meta.env.VITE_API_URL;

export const socket = io(ENDPOINT, {
	autoConnect: false,
	transports: ["websocket"]
});