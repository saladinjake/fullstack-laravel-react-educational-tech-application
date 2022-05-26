<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            $message = $exception->getMessage() ? $exception->getMessage() : "End point doesn't exist";

            return response()->json([
                'error' => [
                    'status' =>  404,
                    'message' =>  $message,
                ],
            ], 404);
        }

        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException) {
            $message = $exception->getMessage() ? $exception->getMessage() : 'This endpoint or method does not exist';

            return response()->json([
                'error' => [
                    'status' =>  405,
                    'message' =>  $message,
                ],
            ], 405);
        }

        if ($exception instanceof AuthenticationException) {
            $message = $exception->getMessage() ? $exception->getMessage() : 'Invalid Token';

            return response()->json([
                'error' => [
                    'status' =>  401,
                    'message' =>  $message,
                ],
            ], 401);
        }

        if ($exception instanceof AuthorizationException) {
            $message = $exception->getMessage() ? $exception->getMessage() : "You're unauthorized to make this request";

            return response()->json([
                'error' => [
                    'status' =>  403,
                    'message' =>  $message,
                ],
            ], 403);
        }

        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'error' => [
                    'status' =>  404,
                    'message' =>  'Item not found.',
                ],
            ], 404);
        }

        $userLevelCheck = $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\RoleDeniedException ||
        $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\RoleDeniedException ||
        $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\PermissionDeniedException ||
        $exception instanceof \jeremykenedy\LaravelRoles\App\Exceptions\LevelDeniedException;

        if ($userLevelCheck) {
            if ($request->expectsJson()) {
                return response()->json([
                    'error'    =>  403,
                    'message'   =>  'Unauthorized. Oh Snap! You\'re unauthorized to make this request',
                ], 403);
            }

            abort(403);
        }

        return parent::render($request, $exception);
    }
}
