const API_URL = "http://localhost:5500";
async function httpGetPlanets() {
  try{
    const planetsRaw = await fetch(`${API_URL}/planets`);
  const planet = await planetsRaw.json();
  return planet;
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  }catch(error){
    console.error(error);
  }
}

async function httpGetLaunches() {
  try{
    const launchesRaw = await fetch(`${API_URL}/launches`);
  const launches = await launchesRaw.json();
  return launches.sort((a, b)=> a.flightNumber - b.flightNumber);
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  }catch(error){
    console.log(error);
  }
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    })
  }catch(_){
    return {
      ok: false,
    }
  }
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try{
    // Delete launch with given ID.
    return await fetch(`${API_URL}/launches/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }catch(error){
    return {
      ok: false,
    }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};