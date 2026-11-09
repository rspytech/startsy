// Shared slot for the live chat (Socket.IO) connection, so screens can reuse one connection.

import React from "react";
import { createContext } from "react";

var GlobalSocket = createContext();
export default GlobalSocket;
