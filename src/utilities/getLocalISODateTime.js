export function getLocalISODateTime(date) {
  const now = date ? new Date(date) : new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const invoiceDate = new Date(now - offset).toISOString().slice(0, 10);
  const inviceTime = new Date(now - offset).toISOString().slice(11, 19);
  const localISOTime = date
    ? `${invoiceDate} | ${inviceTime}`
    : new Date(now - offset).toISOString().slice(0, 19);
  return localISOTime;
}
