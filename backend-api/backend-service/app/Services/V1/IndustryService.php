<?php

namespace App\Services\V1;

use App\Models\Industry;
use App\Services\BaseService;
use Exception;

class IndustryService extends BaseService
{
    public function fetchAll()
    {
        try {
            $industries = Industry::orderby('name', 'asc')->get();
            if (! $industries) {
                return formatResponse(200, 'No Industry record found', true);
            } else {
                return formatResponse(200, 'Industries retrieved successfully', true, $industries);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            if (Industry::where('id', $id)->exists()) {
                $industry = Industry::findorfail($id);

                return formatResponse(200, 'Industry retrieved successfully', true, $industry);
            } else {
                return formatResponse(404, 'Provided Industry not found', false);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
        //..
    }

    public function update($data, $id)
    {
        //..
    }

    public function delete($id, $data = null)
    {
        //..
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }
}
