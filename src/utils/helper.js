export const objectTransform = (fromObj, toObjKeys) => {
  const toObj = {}
  for (const key of toObjKeys) {
    toObj[key] = fromObj[key] || null
  }
  return toObj
}

export const rangeArray = (from, to) => {
  const arr = []
  let i = to - from + 1
  while (i--) arr[i] = to--
  return arr
}
