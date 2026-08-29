export async function delay(ms = 0) {
  return new Promise((r) => setTimeout(r, 0));
}
