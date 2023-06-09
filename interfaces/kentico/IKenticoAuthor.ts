export interface IKenticoAuthor {
  value: {
    first_name: {
      value: string;
    };
    last_name: {
      value: string;
    };
    image: {
      value: {
        url: string;
      }[];
    };
    caricature: {
      value: {
        url: string;
      }[];
    };
    experience: {
      rawData: {
        value: string;
      };
    };
    job_title: {
      value: string;
    };
    slug:{
      value:string
    }
  }[];
  system: {
    codename: string;
  };
  first_name?:{
    value:string
  }
  last_name?:{
    value:string
  }
}

