// frontend/src/cable.js
import { createConsumer } from "@rails/actioncable";
export default createConsumer("ws://localhost:3000/cable"); // Update if deployed
