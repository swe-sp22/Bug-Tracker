<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bug extends Model
{
    public function solution()
    {
        return $this->belongsTo(Solution::class);
    }
}
