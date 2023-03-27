import { deliverySdk } from "./DeliveryClient";

export class KenticoHttpRequest {
  private deliveryClient = deliverySdk;

  public async getData<T>(type: string): Promise<T> {
    
    const response = await this.deliveryClient
      .items()
      .type(type)
      .toPromise()
      .then((result) => result)
      .catch((error) => console.log('Error on getData KenticoHttpRequest',error));

      return response as T
  }
    
}
