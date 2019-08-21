export interface Mobile {
  id?: number,
  name?: string,
  imgName?:string,
  capacity?: string,
  color?: string,
  priceOne?: number,
  priceTwo?: number,
  priceThree?: number,
  priceFour?: number,
  numberDay?: number;
  deposit?:number
}

export function getMobileInstances(): Array<Mobile> {
 return null;
}
