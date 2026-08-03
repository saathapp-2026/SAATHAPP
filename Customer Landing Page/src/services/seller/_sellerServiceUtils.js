export async function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}
