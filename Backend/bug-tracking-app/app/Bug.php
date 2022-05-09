<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bug extends Model
{
    protected $fillable = ['title', 'description', 'photo', 'type'];
    
    public function project(){
        return $this->belongsTo(Project::class);
    }
    
    public function reporter(){
        return $this->hasMany(User::class);
    }
    public function assignees(){
        return $this->belongsTo(User::class);
    }
}
