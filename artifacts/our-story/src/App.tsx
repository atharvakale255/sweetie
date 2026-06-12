import { Switch, Route, Router as WouterRouter } from "wouter";
import { useEffect } from "react";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  // Enforce dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    // Ensure body background is updated immediately
    document.body.style.backgroundColor = "hsl(240 15% 6%)";
  }, []);

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
