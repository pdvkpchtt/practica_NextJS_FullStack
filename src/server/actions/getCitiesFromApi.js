"use server";

export async function getCitiesFromApi(hint) {
  const raw = await fetch(
    "https://kladr-api.ru/api.php?query=" +
      hint +
      "&contentType=city&withParent=1&limit=10",
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const res = await raw.json();

  const cities = [];

  for (let city of res["result"]) {
    if (city.id !== "Free") {
      cities.push({ id: city.id, name: city.name });
    }
  }

  return cities;
}
