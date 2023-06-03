export interface MyObject {
  [key: string]: string | number | boolean
}

export function trimObject(obj: MyObject): MyObject {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = (obj[key] as string).trim().replace(/\s+/g, ' ')
    }
  }
  return obj
}
