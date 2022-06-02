<?php

namespace App\Services\V1;

use App\Models\Language;
use App\Services\BaseService;
use Exception;

class LanguageService extends BaseService
{
    public function fetchAll()
    {
        try {
            $languages = Language::orderby('english', 'asc')->get();
            if (! $languages) {
                return formatResponse(200, 'No language record found', true);
            } else {
                return formatResponse(200, 'Languages retrieved successfully', true, $languages);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id)
    {
        try {
            if (Language::where('id', $id)->exists()) {
                $language = Language::findorfail($id);

                return formatResponse(200, 'Language retrieved successfully', true, $language);
            } else {
                return formatResponse(404, 'Provided language not found', false);
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
