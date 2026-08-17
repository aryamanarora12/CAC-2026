export async function searchOpportunities(
  userProfile,
  opportunityType
) {
  const response = await fetch(
    "http://localhost:3001/search-opportunities",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        userProfile,
        opportunityType
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to search for opportunities."
    );
  }

  const data = await response.json();

  return data.opportunities;
}