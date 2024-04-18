import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <Routes>
      {routes.map((item) => (
        <Route key={item.path} exact path={item.path} element={item.element} />
      ))}
    </Routes>
  );
}

export default App;
