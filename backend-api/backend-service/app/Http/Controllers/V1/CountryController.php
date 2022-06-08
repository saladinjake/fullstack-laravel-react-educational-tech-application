<?php

namespace App\Http\Controllers\V1;

use App\Models\Country;
use App\Services\V1\CountryService;
use Illuminate\Routing\Controller;

class CountryController extends Controller
{
    public $country;

    public function __construct(CountryService $countryService)
    {
        $this->country = $countryService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @OA\Get(
     *       path="/countries",
     *      operationId="getCountries",
     *      tags={"Countries"},
     *      summary="Authority: All | Gets all countries",
     *      description="Retrieves all countries",
     *      @OA\Response(
     *          response=200,
     *          description="Countries retrieved",
     *          @OA\JsonContent(ref="#/components/schemas/Country")
     *      ),
     *      @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *      @OA\Response(response="403", description="Unauthorized. User not with access role")
     *    )
     */
    public function index()
    {
        return $this->country->fetchAll();
    }

    /**
     * @OA\Get(
     *     path="/countries/{countryId}",
     *     tags={"Countries"},
     *     summary="Authority: All | Get details of a country",
     *     description="Country ID is compulsory",
     *     @OA\Parameter(
     *        name="id",
     *        description="Country ID",
     *        required=true,
     *        in="path",
     *        @OA\Schema(
     *            type="integer"
     *        )
     *     ),
     *     @OA\Response(
     *        response=200,
     *        description="Countries retrieved",
     *        @OA\JsonContent(ref="#/components/schemas/Country")
     *     ),
     *     @OA\Response(response="401", description="Unauthenticated. Token needed"),
     *     @OA\Response(response="403", description="Unauthorized. User not with access role"),
     *     @OA\Response(response="404", description="Resource not found"),
     *     @OA\Response(response="422", description="The given data was invalid.")
     * )
     */
    public function show($id)
    {
        return $this->country->fetchOne($id);
    }
}
