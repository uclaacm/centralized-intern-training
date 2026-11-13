import { useState } from "react";
import ContextPage from "./pages/ContextPage";
import CustomHookPage from "./pages/CustomHookPage";
import PropDrillingPage from "./pages/PropDrillingPage";

import "./App.css";

type Page = "custom" | "context" | "drilling";

function App() {
  const [page, setPage] = useState<Page | null>(null);

  return (
    <div className="App">
      <div className="content-container">
        <nav>
          <div>
            <button className="button-container" onClick={() => setPage("custom")}>
              Custom Hooks
            </button>
            <button className="button-container" onClick={() => setPage("context")}>
              useContext
            </button>
            <button className="button-container" onClick={() => setPage("drilling")}>
              Prop Drilling
            </button>
          </div>
        </nav>

        {page === null && "Click a page on the top to get started!"}

        {page !== null && (
          <div className="subcomponent-container">
            {page === "custom" && <CustomHookPage />}
            {page === "context" && <ContextPage />}
            {page === "drilling" && <PropDrillingPage />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
