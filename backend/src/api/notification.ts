import {Router} from "express";
import axios from "axios";

interface Player {
  id: string;
  device_model:string;
}

// eslint-disable-next-line new-cap
const notification = Router();

const axiosInstance = axios.create({
  baseURL: "https://onesignal.com/api/v1/",
  headers: {
    "accept": "application/json",
    "Authorization": `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
    "Content-Type": "application/json",
  },
});

notification.post("/send", async (req, res) => {
  let {myPlayerId, targetPlayerId, heading, content} = req.body;

  console.log({myPlayerId, targetPlayerId, heading, content});

  if (!((myPlayerId || targetPlayerId) && heading && content)) {
    return res.status(400).send("Missing required fields");
  }

  try {
    if (!targetPlayerId) {
      const {data: {players}} = await axiosInstance.get<{ players: Player[] }>(
        "/players",
        {params: {app_id: process.env.ONESIGNAL_APP_ID, limit: 10, offset: 0}}
      );
      targetPlayerId = players
        .filter(
          (player) =>
            player.device_model === "iPhone" && player.id !== myPlayerId
        )
        .map((player) => player.id);
    }

    console.log(`Sending notification to ${targetPlayerId}`);

    const {data: notification} = await axiosInstance.post("/notifications", {
      app_id: process.env.ONESIGNAL_APP_ID,
      name: "Single User",
      include_player_ids: [targetPlayerId],
      contents: {en: content},
      headings: {en: heading},
      data: {
        timestamp: Date.now(),
      },
    });
    return res.send(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

module.exports = notification;
