import { deliverySdk } from "./DeliveryClient";

export class KenticoHttpRequest {
  private deliveryClient = deliverySdk;

  public async getData<T>(types: string[]): Promise<T> {
    const response = await this.deliveryClient
      .items()
      .types(types)
      .toPromise()
      .then((result) => result)
      .catch((error) =>
        console.log("Error on getData KenticoHttpRequest", error)
      );

    return response as T;
  }

  public async getLatestPosts() {
    const response = await this.deliveryClient
      .items()
      .containsFilter("elements.author", ["konabos_7e45777"]) //need to update to use dynamic codename
      .toPromise()
      .then((result) => result)
      .catch((error) => {
        console.log("error on getLatestPosts KenticoHttpRequest", error);
      });

      return response;
  }
}
