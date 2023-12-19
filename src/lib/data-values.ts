export default function DataValues(data: any) {
  function HexToDec(hexString: string) {
    return parseInt(hexString, 16)
  }

  const dataParts: any[] = []
  let hex = ''
  let dec = 0

  for (let i = 0; i < data.length; i++) {
    hex = hex + '' + data[i]

    if (hex.length === 2) {
      dec = dataParts.push({ hex, dec: HexToDec(hex) })
      hex = ''
    }
  }

  return dataParts
}
