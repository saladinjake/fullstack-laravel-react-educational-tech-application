<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller; 
use App\Models\Certificate;
use App\Services\V1\CertificateService;
use App\Http\Requests\CreateCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;

class CertificateController extends Controller
{
  public $certificate;

  public function __construct(CertificateService $certificateService)
  {
      $this->certificate = $certificateService;
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */

  /**
   * @OA\Get(
   *       path="/certificates",
   *      operationId="index",
   *      tags={"Certificates"},
   *      summary="Authority: All | Gets all certificates",
   *      description="Retrieves all certificates",
   *      @OA\Response(
   *          response=200,
   *          description="Certificate retrieved",
   *          @OA\JsonContent(ref="#/components/schemas/Certificate")
   *       )
   *    )
   */
  public function index()
  {
      return $this->certificate->fetchAll();
  }

  /**
   * @OA\Get(
   *     path="/certificates/{id}",
   *     tags={"Certificates"},
   *     summary="Authority: All | Get details of a Certificate",
   *     description="Certificate ID is compulsory",
   *     @OA\Parameter(
   *        name="id",
   *        description="Certificate ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(
   *        response=200,
   *        description="Certificate retrieved",
   *        @OA\JsonContent(ref="#/components/schemas/Certificate")
   *     ),
   *     @OA\Response(response="404", description="Resource not found"),
   *     @OA\Response(response="422", description="The given data was invalid.")
   * )
   */
  public function show($id)
  {
      return $this->certificate->fetchOne($id);
  }

  /**
   * @OA\Post(
   *       path="/certificates/create",
   *      operationId="createCertificate",
   *      tags={"Certificates"},
   *      summary="Authority: Superadmin | Creates a certificate",
   *      description="Stores a new Certificate",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateCertificateRequest")
   *      ),
   *      @OA\Response(
   *          response=201,
   *          description="Certificate created",
   *          @OA\JsonContent(ref="#/components/schemas/Certificate")
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   *
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\CreateCertificateRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(CreateCertificateRequest $request)
  {
      return $this->certificate->create($request->validated());
  }

  /**
   * @OA\Put(
   *      path="/certificates/update/{certificateId}",
   *      operationId="updateCertificate",
   *      tags={"Certificates"},
   *      summary="Authority: Superadmin | Updates a certificate | Please use x-www-form-urlencoded for body",
   *      description="Update Certificate",
   *      @OA\Parameter(
   *        name="certificateId",
   *        description="Certificate ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *      ),
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateCertificateRequest")
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Certificate updated",
   *          @OA\JsonContent(ref="#/components/schemas/Certificate")
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=404,
   *          description="Certificate not found",
   *       ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\UpdateCertificateRequest  $request
   * @param  \App\Models\Certificate  $certificate
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateCertificateRequest $request, int $id)
  {
      return $this->certificate->update($request->validated(), $id);
  }

  /**
   * @OA\Delete(
   *     path="/certificates/{certificateId}/delete",
   *     operationId="deleteCertificate",
   *     tags={"Certificates"},
   *     summary="Authority: Superadmin | Deletes a certificate",
   *     description="Deletes a Certificate",
   *     @OA\Parameter(
   *        name="certificateId",
   *        description="Certificate ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Certificate deleted successfully",
   *     ),
   *     @OA\Response(
   *         response="403",
   *         description="Unauthorized. User not with access role",
   *     ),
   *     @OA\Response(
   *         response=404,
   *         description="Certificate not found",
   *     ),
   *     @OA\Response(
   *         response=422,
   *         description="The given data was invalid.",
   *     ),
   *  )
   */
  public function destroy(int $id)
  {
      return $this->certificate->delete($id);
  }
}
