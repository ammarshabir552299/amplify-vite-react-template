import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Authenticator } from '@aws-amplify/ui-react'; // ✅ You already import it
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);
