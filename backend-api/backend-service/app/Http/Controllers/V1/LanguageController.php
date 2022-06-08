<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Services\V1\LanguageService;

class LanguageController extends Controller
{
    public $language;

    public function __construct(LanguageService $languageService)
    {
        $this->language = $languageService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *       path="/languages",
     *      operationId="index",
     *      tags={"Languages"},
     *      summary="Authority: All | Gets all languages",
     *      description="Retrieves all languages",
     *      @OA\Response(
     *          response=200,
     *          description="Languages retrieved",
     *          @OA\JsonContent(ref="#/components/schemas/Language")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->language->fetchAll();
    }

    /**
     * @OA\Get(
     *     path="/languages/{languageId}",
     *     tags={"Languages"},
     *     summary="Authority: All | Business | Get details of a language",
     *     description="Language ID is compulsory",
     *     @OA\Parameter(
     *        name="id",
     *        description="Language ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *        response=200,
     *        description="Language retrieved",
     *        @OA\JsonContent(ref="#/components/schemas/Language")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found"),
     *     @OA\Response(response="422", description="The given data was invalid.")
     * )
     */
    public function show($id)
    {
        return $this->language->fetchOne($id);
    }
}
