<?php

namespace App\Http\Middleware;

use Closure;

class CheckHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $_AUTH =  $request->header('Authorization');

        if(empty($_AUTH)){
            return $request->merge([
                'error'=>'Header Authorization is Empty or not defined'
            ]);
        }
        return $next($request);
    }
}
