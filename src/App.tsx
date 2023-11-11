import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "src/context/UserContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContextProvider>
          <AppRoutes />
          <Toaster />
        </UserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
