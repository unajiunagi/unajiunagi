import { Vimeo, RequestOptions } from "vimeo";

const vimeo = new Vimeo(process.env.VIMEO_CLIENT_ID!, process.env.VIMEO_CLIENT_SECRET!, process.env.VIMEO_ACCESS_TOKEN);

/**
 * Vimeo APIにリクエストする。vimeo クライアントはそのままだとPromiseに対応していないのでラップします。
 */
export function vimeoRequest<T extends any = any>(options: RequestOptions): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    vimeo.request(options, (err, result, statusCode, headers) => {
      console.log('vimeo-client');

      if (err) {
        console.log(`APIerror: ${err}`);

        reject(err);
      }
      console.log('vimeo-client-finish');
      
      resolve(result);
    });
  });
}
