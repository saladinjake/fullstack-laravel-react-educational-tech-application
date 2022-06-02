<?php

namespace App\Services\V1;

use App\Models\Programme;
use App\Models\ProgrammeLevel;
use App\Services\BaseService;
use Exception;
use DB;

class ProgrammeService extends BaseService
{
    public function fetchAll()
    {
        try {
            $programmes = Programme::with('courses')->orderby('name', 'asc')->get();
            if (!$programmes) {
                return formatResponse(200, 'No Programmes found', true);
            } else {
                return formatResponse(200, 'Programmes retrieved successfully', true, $programmes);
            }
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function create($data)
    {
      try {

          DB::transaction(function () use ($data, &$saveProgramme) {
              $saveProgramme = Programme::create([
                  'name' => $data['name'],
                  'description' => $data['description'],
                  'certificate_title' => $data['certificate_title']
              ]);

              foreach($data['programme_levels'] as $level) {
                ProgrammeLevel::updateOrCreate(
                    ['programme_id' => $saveProgramme->id, 'name' => $level['name']],
                    [
                        'description' => $level['description']
                    ]
                );
              }
          });

          return formatResponse(201, 'Programme created successfully', true, $saveProgramme);


      } catch (Exception $e) {
          return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
      }
    }

    public function createCourses($data) {
        try {

            DB::transaction(function () use ($data) {
                foreach($data['programme_courses'] as $course) {
                    DB::table('programme_courses')->updateOrInsert(
                        ['course_id' => $course["course_id"], 'programme_id' => $course["programme_id"]],
                        [
                            'programme_level_id' => $course["programme_level_id"]
                        ]
                    );
                }
            });
  
            return formatResponse(201, 'Programme course created successfully', true);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function fetchOne($id) {
        try {
            $programme = Programme::findOrFail($id);
            return formatResponse(201, 'Programme created successfully', true, [
                'programme' => $programme,
                'programme_levels' => $programme->programmeLevels,
                'programme_courses' => $programme->courses
            ]);
        } catch (Exception $e) {
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function update($data, $id)
    {
        try {
            $programme = Programme::find($id);
            if (!$programme) {
                return formatResponse(404, 'Programme doesn\'t exist!', false);
            }
            DB::beginTransaction();
                $programme->update([
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'certificate_title' => $data['certificate_title']
                ]);

                foreach($data['programme_levels'] as $level) {
                    ProgrammeLevel::updateOrCreate(
                        ['programme_id' => $programme->id, 'name' => $level['name']],
                        [
                            'description' => $level['description']
                        ]
                    );
                }  
                
                foreach($data['programme_courses'] as $course) {
                    $programme->courses()->sync($course['course_id']);
                }
            DB::commit();
            return formatResponse(200, 'Programme updated successfully', true, $programme);
        } catch (Exception $e) {
            DB::rollback();
            return formatResponse(fetchErrorCode($e), get_class($e).': '.$e->getMessage());
        }
    }

    public function delete($id, $data = null)
    {
        try {
            $programme = Programme::find($id);

            if (! $programme) {
                return formatResponse(404, 'Programme not found', false);
            }

            DB::beginTransaction();
                $programme->delete();
            DB::commit();

            return formatResponse(200, 'Programme deleted successfully', true);
        } catch (Exception $e) {
            DB::rollback();
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
}