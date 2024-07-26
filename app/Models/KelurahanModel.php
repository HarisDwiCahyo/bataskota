<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KelurahanModel extends Model
{
    use HasFactory;
    protected $table = 'kelurahan';
    protected $primaryKey = 'gid';
    protected $guarded = ['gid'];
    protected $fillable = [];

    protected $dates = ['created_at', 'updated_at'];
}
