// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'
import {QueryClient,QueryClientProvider} from "react-query";
import React from 'react'
import { Toaster } from 'sonner'
/*
  QueryClient is responsible for managing all the caching, fetching, 
  and background syncing of data in your React app.
*/
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
  },
})

// AppRoutes will have the access to the auth0 hook
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
        <AppRoutes/>
        <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
);
