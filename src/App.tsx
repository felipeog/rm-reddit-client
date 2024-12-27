import { LanesContainer } from "./components/LanesContainer";
import { ToastProvider } from "./components/ToastProvider";

export function App() {
  return (
    <div className="App">
      <LanesContainer />
      <ToastProvider />
    </div>
  );
}
