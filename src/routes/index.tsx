// routes/index.js
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, protectedRoutes, specialRoutes } from './routeConfig';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.requiresPublicRoute ? route.element: route.element}
        />
      ))}

      {/* Protected routes */}
      {protectedRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Special routes (404, etc.) */}
      {specialRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
