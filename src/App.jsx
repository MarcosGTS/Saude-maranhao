import blob1 from './assets/imgs/blob_1.png';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div>
        <Topbar />
        <div className="min-h-160">
          <img src={blob1} style={{
            position: 'absolute', 
            top: "0px",
            right: "0px",
            zIndex: "-10",
          }}></img>
          <Outlet />
        </div>
        <Footer/>
      </div>
    </AuthProvider>
  );
}

