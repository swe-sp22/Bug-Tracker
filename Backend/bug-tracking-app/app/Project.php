<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'description'];

    public function bugs()
    {
        return $this->hasMany(Bug::class);
    }
}
