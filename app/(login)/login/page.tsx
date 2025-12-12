"use client";

import { createClient } from "@/lib/supabase/client";

const Login = () => {
  const handleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <div>
      <button type="button" onClick={handleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
