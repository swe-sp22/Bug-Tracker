<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bug extends Model
{
    protected $fillable = ['title', 'description', 'photo', 'type', 'project_id'];
    
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee()
    {
        // Belongs to one staff-member
        return $this->belongsTo(User::class);
    }
}
