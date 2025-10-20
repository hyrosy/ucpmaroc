// In supabase/functions/create-payment-intent/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@10.12.0";

// --- NEW: Add CORS headers ---
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Or "http://localhost:5173" for more security
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2022-11-15",
});

serve(async (req) => {
  // --- NEW: Handle preflight OPTIONS request ---
  // This is a special request browsers send to check CORS permissions before the actual request.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "mad",
      automatic_payment_methods: { enabled: true },
    });

    // --- UPDATED: Return response with CORS headers ---
    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    // --- UPDATED: Return error with CORS headers ---
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
