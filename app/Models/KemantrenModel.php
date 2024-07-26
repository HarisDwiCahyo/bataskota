<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KemantrenModel extends Model
{
    use HasFactory;
    protected $table = 'kemantren';
    protected $primaryKey = 'gid';
    protected $guarded = ['gid'];
    protected $fillable = [];

    protected $dates = ['created_at', 'updated_at'];
}
