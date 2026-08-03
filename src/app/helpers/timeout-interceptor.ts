import { HttpInterceptorFn } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";

export const TimeoutInterceptor: HttpInterceptorFn = (req, next) => {
  const defaultTimeout = 10000; // 10 seconds

  return next(req).pipe(
    timeout(defaultTimeout),
    catchError((err) => {
      if (err.name === 'TimeoutError') {
        console.error(`Request to ${req.url} timed out.`);
      }
      return throwError(() => err);
    })
  );
};