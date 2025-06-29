"use server";
export async function getGlobalData() {
  const url = "https://api.coingecko.com/api/v3/global";
  //const response = await fetch(url);
  try {
    const options = {      
      next: { revalidate: 3600 },
    }
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const json = await response.json();
    //console.log(json);
    return json;
  } catch (error) {
    //console.log(error);
    return error;
  }
}
