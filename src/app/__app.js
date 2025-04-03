// src/app/_app.js
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../globals.css"; // Ensure Tailwind is imported

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
