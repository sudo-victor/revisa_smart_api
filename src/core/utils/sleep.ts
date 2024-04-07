
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setInterval(() => { resolve(null) }, ms)
  })
}
