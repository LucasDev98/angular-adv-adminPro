import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor{
  private urlExclude : string[] = ['/auth/login'];
  
  constructor( private authService : AuthService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(this.urlExclude.includes(req.url)){
      return next.handle(req)
    }
    
    const headers = new HttpHeaders({
      'x-token' : this.authService.token
    })

    const reqClone = req.clone({headers})
    
    return next.handle(reqClone);

    
  }
}
