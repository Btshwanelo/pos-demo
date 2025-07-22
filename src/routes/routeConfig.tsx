// Import all your page components

import App from "@/pages/Demo";


// Public routes configuration (routes that don't require authentication)
export const publicRoutes = [
  {
    path: '/',
    element: <App /> ,
    requiresPublicRoute: false,
  },
];

// // Protected routes configuration (routes that require authentication)
export const protectedRoutes = [
//   // Dashboard
//   {
//     path: '/dashboard',
//     element: <DashboardPage />,
//   },

];

// Special routes (404, etc.)
export const specialRoutes = [
//   {
//     path: '*',
//     element: <NotFound />,
//   },
];
