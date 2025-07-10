export function getLocalISODateTime() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - offset).toISOString().slice(0, 19);
  return localISOTime;
}
