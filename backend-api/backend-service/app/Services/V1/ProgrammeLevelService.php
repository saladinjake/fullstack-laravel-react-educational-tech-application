<?php

namespace App\Services\V1;

use App\Models\ProgrammeLevel;
use App\Models\Programme;
use App\Services\BaseService;
use Exception;
use DB;

class ProgrammeLevelService extends BaseService
{
    public function fetchAll()
    {
        try {
            $programmeLevels = ProgrammeLevel::with('courses')->orderby('name', 'asc')->get();
            if (!$programmeLevels) {
                return formatResponse(200, 'No Programme levels found', true);
            } else {
                return formatResponse(200, 'Programme Levels retrieved successfully', true, $programmeLevels);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function getProgrammes($levelName)
    {
        try {
            $programmeLevels = ProgrammeLevel::where('name', $levelName)->get();
            if(!$programmeLevels) {
                return formatResponse(200, 'No Programmes found for this level', true);
            }
            $programme = [];
            foreach($programmeLevels as $level) {
                $programme[] = Programme::findOrFail($level->programme_id);
            }
            return formatResponse(201, 'Programmes retrieved successfully', true, $programme);
            
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update($data, $programmeId)
    {
        try {
            $programme = Programme::findOrFail($programmeId);
            DB::transaction(function () use ($data, &$programmeId) {
                ProgrammeLevel::where('programme_id', $programmeId)->update([
                    'name' => $data['name'],
                    'description' => $data['description']
                ]);
            });
            return formatResponse(200, 'Programme updated successfully', true);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($programmeId)
    {
        try {
            $programme = Programme::findOrFail($programmeId);
            DB::transaction(function () use (&$programmeId) {
                ProgrammeLevel::where('programme_id', $programmeId)->delete();
            });
            return formatResponse(200, 'Programme updated successfully', true);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        //..
    }

    public function fetchMany($begin, $perPage, $sortBy, $sortDirection)
    {
        //..
    }

    public function fetchOne($id)
    {
        //..
    }

    public function create($data)
    {
        //..
    }
}
