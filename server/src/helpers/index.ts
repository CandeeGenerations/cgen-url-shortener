export const makeId = (length = 5) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const asyncForEach = async (
  array: any[],
  callback: (item: any, index: number, array: any[]) => void,
) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
