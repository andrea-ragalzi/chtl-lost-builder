import { useAppSelector } from '../../../shared/hooks/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { type RootState } from '../../../app/store'; // Import RootState

const ProtectedRoute = () => {
  // Check if the 'user' object exists in the Redux state
  const { user } = useAppSelector((state: RootState) => state.auth); // Use RootState

  // If there is no user, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user exists, show the requested page.
  return <Outlet />;
};

export default ProtectedRoute;