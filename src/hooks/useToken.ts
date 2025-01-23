import { jwtDecode } from "jwt-decode";

import cookie from "js-cookie";

export default function useToken() {
  const token = cookie.get("token");
  const decodedToken = jwtDecode(token!) as { userId: string };

  return { token, decodedToken };
}
