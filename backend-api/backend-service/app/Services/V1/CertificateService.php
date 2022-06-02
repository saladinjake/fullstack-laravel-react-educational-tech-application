<?php

namespace App\Services\V1;

use App\Models\Certificate;
use App\Services\BaseService;
use Exception;
use DB;

class CertificateService extends BaseService
{
    public function fetchAll()
    {
        try {
            $certificates = Certificate::orderby('name', 'asc')->get();
            if (! $certificates) {
                return formatResponse(200, 'No Certificate record found', true);
            } else {
                return formatResponse(200, 'Certificates retrieved successfully', true, $certificates);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            if (Certificate::where('id', $id)->exists()) {
                $certificate = Certificate::findorfail($id);

                return formatResponse(200, 'Certificate retrieved successfully', true, $certificate);
            } else {
                return formatResponse(404, 'Provided Certificate not found', false);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
      try {

          DB::transaction(function () use ($data, &$saveCertificate) {
              $saveCertificate = Certificate::create($data);
          });

          return formatResponse(201, 'Certificate created successfully', true, $saveCertificate);


      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function update($data, $id)
    {
      try {
          $certificate = $this->getCertificate($id);
          if (! $certificate) {
              return formatResponse(404, 'Certificate not found', false);
          } else {
              DB::transaction(function () use ($data, $certificate) {
                  $updateCertificate = $certificate->update([
                    'name' => $data['name'],
                    'description' => $data['description']
                  ]);
              });

              return formatResponse(200, 'Certificate updated successfully', true, $certificate);
          }

      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function delete($id, $data = null)
    {
      try {
          $certificate = Certificate::where(['id' => $id])->first();

          if (! $certificate) {
              return formatResponse(404, 'Certificate doesn\'t exist!', false);
          } else {
              DB::beginTransaction();
                  $certificate->delete();
              DB::commit();

              return formatResponse(200, 'Certificate deleted successfully', true);
          }
      } catch (Exception $e) {
          DB::rollback();

          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }

    public function getCertificate($id)
    {
        $certificate = Certificate::where(['id' => $id])->first();

        return $certificate;
    }
}
