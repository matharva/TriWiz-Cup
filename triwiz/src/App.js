import "./styles/App.css";
import Pathfinder from "./Pathfinder";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Pathfinder />
      </div>
    </AuthProvider>
  );
}

export default App;
