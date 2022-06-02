<?php

namespace App\Services;

abstract class BaseService
{
    abstract public function fetchAll();

    abstract public function fetchMany($begin, $perPage, $sortBy, $sortDirection);

    abstract public function create($data);

    abstract public function fetchOne($id);

    abstract public function update($data, $id);

    abstract public function delete($id);
}
