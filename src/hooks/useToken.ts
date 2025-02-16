"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import cookie from "js-cookie";

export default function useToken() {
  const [decodedToken, setDecodedToken] = useState<{ userId: string }>({
    userId: "",
  });
  const token = cookie.get("token");

  useEffect(() => {
    const jwtDecodedToken = jwtDecode(token!) as { userId: string };
    setDecodedToken(jwtDecodedToken);
  }, [token]);

  return { token, decodedToken };
}
