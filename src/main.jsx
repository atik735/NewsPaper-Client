import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Create a client
const queryClient = new QueryClient()
// Load Stripe public key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* Wrap with Stripe Elements */}
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
          <Toaster position='top-right' reverseOrder={false} />
        </Elements>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
