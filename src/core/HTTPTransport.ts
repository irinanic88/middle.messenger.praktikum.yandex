import {
  HTTPMethod,
  HttpMethodType,
  QueryParams, RequestOptions,
} from '../types/api.types';
import { HTTP_METHODS as METHODS } from '../utils/constants';
import { queryStringify } from '../utils/helpers';

export class HTTPTransport {
  private createMethod(method: HttpMethodType): HTTPMethod {
    return <T = unknown, TData = unknown>(
      url: string,
      options?: RequestOptions<TData>
    ): Promise<T> => this.request<T, TData>(url, { ...(options ?? {}), method });
  }

  readonly get = this.createMethod(METHODS.GET);
  readonly post = this.createMethod(METHODS.POST);
  readonly put = this.createMethod(METHODS.PUT);
  readonly delete = this.createMethod(METHODS.DELETE);

  request = <T = unknown, TData = unknown>(url: string, options: RequestOptions<TData>): Promise<T> => {
    const { method, data, headers, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let urlString = url;
      let sendData: string | null = null;

      if (method === METHODS.GET && data) {
        urlString += queryStringify(data as QueryParams);
      } else if (method && data) {
        sendData = JSON.stringify(data);
      }

      xhr.open(method!, urlString);

      Object.entries(headers ?? {}).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        try {
          resolve(JSON.parse(xhr.responseText) as T);
        } catch {
          resolve(xhr.response as T);
        }
      };
      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error('Request timed out'));

      xhr.send(sendData);
    });
  };

  fetchWithRetry = <T = unknown, TData = unknown>(url: string, options: RequestOptions<TData>): Promise<T> => {
    const { tries = 1 } = options;

    const onError = (err: unknown): Promise<T> => {
      const triesLeft = tries - 1;

      if (!triesLeft) throw err;

      return this.fetchWithRetry<T>(url, { ...options, tries: triesLeft });
    };

    return this.request<T>(url, options).catch(onError);
  };
}
