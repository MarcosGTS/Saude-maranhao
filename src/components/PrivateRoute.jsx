import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return (<>
    <div className="w-full flex justify-center">
      <ProgressSpinner className='mx-auto'/>
    </div>  
  </>)

  return user ? children : <Navigate to="/login" replace />;
}
