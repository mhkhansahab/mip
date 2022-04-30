import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/css/index.css";
import { PageWrapper } from "./components/common/PageWrapper";
import { queryClient } from "./utils/api";

function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <PageWrapper />
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
