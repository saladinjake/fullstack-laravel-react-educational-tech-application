<?php

namespace App\Services\V1;

use App\Models\Country;
use App\Services\BaseService;
use Exception;

class CountryService extends BaseService
{
    public function fetchAll()
    {
        try {
            $countries = Country::orderby('name', 'asc')->get();
            if (! $countries) {
                return formatResponse(200, 'No country record found', true);
            } else {
                return formatResponse(200, 'Countries retrieved successfully', true, $countries);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            if (Country::where('id', $id)->exists()) {
                $country = Country::findorfail($id);

                return formatResponse(200, 'Country retrieved successfully', true, $country);
            } else {
                return formatResponse(404, 'Provided country not found', false);
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
