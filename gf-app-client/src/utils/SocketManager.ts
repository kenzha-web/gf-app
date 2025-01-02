import { io } from "socket.io-client";

let socket = io("http://ec2-16-16-209-140.eu-north-1.compute.amazonaws.com");

export default socket;
