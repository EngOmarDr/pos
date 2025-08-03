import axiosInstance from "../utilities/api";

export async function fetchAds() {
  const response = await axiosInstance.get("/advertisements");
  return response.data;
}


export async function checkShift() {
  const response = await axiosInstance.get(
    `/shifts/check`
  );
  console.log(response.data);
  localStorage.setItem('shiftIsStarted', response.data.endCash == null)
  return response.data;
}

export async function startShift(startCash) {
  const response = await axiosInstance.post(
    `/shifts`,
    { startCash }
  );
  localStorage.setItem('shiftIsStarted', true)
  return response.data;
}

export async function closeShift(endCash, notes) {
  const response = await axiosInstance.put(
    `/shifts`,
    { endCash, notes }
  );
  localStorage.setItem('shiftIsStarted', false)
  return response.data;
}
