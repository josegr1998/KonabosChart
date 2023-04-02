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

  public async getAuthorProfile<T>(authorSlug: string):Promise<T>  {
    const response = await this.deliveryClient
      .items()
      .type("person")
      .equalsFilter("elements.slug", authorSlug)
      .toPromise()
      .then((result) => result)
      .catch((error) =>
        console.log("Error on getAuthorProfile KenticoHttpRequest", error)
      );
    return response as T
  }

  public async getLatestAuthorPosts<T>(authorCodename:string):Promise<T> {
    const response = await this.deliveryClient
      .items()
      .containsFilter("elements.author", [authorCodename]) //need to update to use dynamic codename
      .toPromise()
      .then((result) => result)
      .catch((error) => {
        console.log("error on getLatestPosts KenticoHttpRequest", error);
      });

    return response as T;
  }
}
