import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { GenerateInviteResponse } from "../types/Invite";
import { AcceptInviteResponse } from "../types/Invite";
const API_URL = "http://localhost:8001/api/invites";

export const generateBoardInvite = async (
  boardId: string,
  email: string
): Promise<string> => {
  try {
    const { data } = await axios.post<GenerateInviteResponse>(
      `${API_URL}/generate`,
      {
        boardId,
        email,
        creatorId: auth.currentUser?.uid,
      }
    );

    return `${window.location.origin}/invite/${data.inviteId}`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || "Failed to generate invite"
      );
    }
    throw error;
  }
};

export const getInvite = async (inviteId: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/${inviteId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to get invite");
    }
    throw error;
  }
};

export const acceptBoardInvite = async (
  inviteId: string,
  userId: string
): Promise<AcceptInviteResponse> => {
  try {
    const { data } = await axios.post<AcceptInviteResponse>(
      `${API_URL}/${inviteId}/accept`,
      { userId }
    );
    console.log("data", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to accept invite");
    }
    throw error;
  }
};
