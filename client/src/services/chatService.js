import auth from "../config/firebase";
import { io } from "socket.io-client";

const BASE_URL = 'http://localhost:3000';

const getUserToken = async () => {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    return token;
}

export const initiateSocketConection = async () => {
    const token = await getUserToken();
    const socket = io(BASE_URL, {
        auth: { token }
    });
    return socket;
}

export const getAllUsers = async () => {
    const request = await fetch(`${BASE_URL}/api/user`);
    const response = await request.json();
    return response;
}