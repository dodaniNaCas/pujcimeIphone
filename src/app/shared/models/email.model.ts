import { FormOrderModel } from "./form-order.mode";

export interface Email{
  name?:string,
  email?: string,
  subject?: string,
  body?: FormOrderModel
}
