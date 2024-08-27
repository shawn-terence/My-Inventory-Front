import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import InventoryPage from './pages/Inventory'
import SaleTerminal from './pages/Sales'
import Statisstics from './pages/Statistics'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/sale-terminal" element={<SaleTerminal />} />
      <Route path="/statistics" element={<Statisstics />} />
    </Routes>
  );
}

export default App;
