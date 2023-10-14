import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
