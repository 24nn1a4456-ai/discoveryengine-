const API_URL = "http://localhost:5000/api";

export async function searchProducts(query, sessionId) {
  const response = await fetch(`${API_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error("Search request failed");
  }

  return response.json();
}

export async function getRecommendations({
  query,
  category,
  sessionId,
  searchHistory,
}) {
  const response = await fetch(`${API_URL}/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      category,
      sessionId,
      searchHistory,
    }),
  });

  if (!response.ok) {
    throw new Error("Recommendation request failed");
  }

  return response.json();
}

export async function askAIAssistant({
  message,
  sessionId,
  searchHistory,
}) {
  const response = await fetch(`${API_URL}/ai-assistant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId,
      searchHistory,
    }),
  });

  if (!response.ok) {
    throw new Error("AI assistant request failed");
  }

  return response.json();
}