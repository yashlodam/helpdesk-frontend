import axios from "axios";

const BASE_URL = "http://localhost:8081/api/v1/helpdesk";

export const sendMessageToAi = async (messages, conversationId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/stream`,
      messages,
      {
        headers: {
          ConversationId: conversationId,
        },
      }
    );

    console.log("Response from backend:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};