<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use App\Services\V1\IndustryService;

class IndustryController extends Controller
{
    public $industry;

    public function __construct(IndustryService $industryService)
    {
        $this->industry = $industryService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *       path="/industries",
     *      operationId="index",
     *      tags={"Industries"},
     *      summary="Authority: All | Gets all industries",
     *      description="Retrieves all industries",
     *      @OA\Response(
     *          response=200,
     *          description="Industries retrieved",
     *          @OA\JsonContent(ref="#/components/schemas/Industry")
     *       )
     *    )
     */
    public function index()
    {
        return $this->industry->fetchAll();
    }

    /**
     * @OA\Get(
     *     path="/industries/{id}",
     *     tags={"Industries"},
     *     summary="Authority: All | Get details of an industry",
     *     description="Industry ID is compulsory",
     *     @OA\Parameter(
     *        name="id",
     *        description="Industry ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *        response=200,
     *        description="Industry retrieved",
     *        @OA\JsonContent(ref="#/components/schemas/Industry")
     *     ),
     *     @OA\Response(response="404", description="Resource not found"),
     *     @OA\Response(response="422", description="The given data was invalid.")
     * )
     */
    public function show($id)
    {
        return $this->industry->fetchOne($id);
    }
}
