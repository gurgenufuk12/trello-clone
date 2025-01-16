import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
