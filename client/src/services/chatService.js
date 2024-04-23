import axios from 'axios';
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
    const request = await axios.get(`${BASE_URL}/api/user`);
    const response = request.data;
    return response;
}

export const getUser = async (userId) => {
    const request = await axios.get(`${BASE_URL}/api/user/${userId}`);
    const response = request.data;
    return response;
}

export const getChatRooms = async (userId) => {
    const request = await axios.get(`${BASE_URL}/api/room/${userId}`);
    const response = request.data;
    return response;
}

export const createChatRoom = async (members) => {
    const request = await axios.post(`${BASE_URL}/api/room`, members);
    const response = request.data;
    return response;
}