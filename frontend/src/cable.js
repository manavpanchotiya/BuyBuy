import { createConsumer } from "@rails/actioncable";
import { backendURL } from "./api";

const wsProtocol = backendURL.startsWith("https") ? "wss" : "ws";
const wsURL = backendURL.replace(/^http/, wsProtocol) + "/cable";
console.log("WebSocket URL:", wsURL);


export default createConsumer(wsURL);
