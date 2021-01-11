export const objectTransform = (fromObj, toObjKeys) => {
  const toObj = {}
  for (const key of toObjKeys) {
    toObj[key] = fromObj[key] || null
  }
  return toObj
}
