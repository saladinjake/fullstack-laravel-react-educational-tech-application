<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class Enabler
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
        if ($request->user()->status != '-1') {
            return $next($request);
        } else {
            // Auth::logout();
            auth('web')->logout();
            $request->user()->token()->revoke();

            return response()->json([
              'message' => 'Oh Snap! An error occured. Unauthorized User.',
            ], 401);
        }
    }
}
