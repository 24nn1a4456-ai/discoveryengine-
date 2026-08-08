export function getSessionId() {
  let sessionId = sessionStorage.getItem("snapcart_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    sessionStorage.setItem(
      "snapcart_session_id",
      sessionId
    );
  }

  return sessionId;
}