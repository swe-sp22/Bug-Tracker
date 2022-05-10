<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'description'];
    public function customers(){
        return $this->hasMany(User::class);
    }
    public function bugs(){
        return $this->hasMany(Bug::class);
    }
}
