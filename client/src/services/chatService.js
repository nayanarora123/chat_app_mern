import axios from 'axios';
import auth from "../config/firebase";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_REACT_ENV === 'production' ? '/api' : `${import.meta.env.VITE_BASE_URL}/api`;

const getUserToken = async () => {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    return token;
}

export const initiateSocketConection = async () => {
    const token = await getUserToken();
    const socket = io(import.meta.env.VITE_REACT_ENV === 'production' ? '/' : `${import.meta.env.VITE_BASE_URL}/`, {
        auth: { token }
    });
    return socket;
}

export const getAllUsers = async () => {
    const request = await axios.get(`${BASE_URL}/user`);
    const response = request.data;
    return response;
}

export const getUser = async (userId) => {
    const request = await axios.get(`${BASE_URL}/user/${userId}`);
    const response = request.data;
    return response;
}

export const getChatRooms = async (userId) => {
    const request = await axios.get(`${BASE_URL}/room/${userId}`);
    const response = request.data;
    return response;
}

export const createChatRoom = async (members) => {
    const request = await axios.post(`${BASE_URL}/room`, members);
    const response = request.data;
    return response;
}

export const getMessagesOfChatRoom = async (chatRoomId) => {
    const request = await axios.get(`${BASE_URL}/message/${chatRoomId}`);
    const response = request.data;
    return response;

};

export const sendMessage = async (messageBody) => {
    try {
        const res = await axios.post(`${BASE_URL}/message`, messageBody);
        return res.data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteMessage = async (messageId, deleteAction) => {
    try {
        const res = await axios.delete(`${BASE_URL}/message/${messageId}/${deleteAction}`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
};
