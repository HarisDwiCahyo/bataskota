<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KotaModel extends Model
{
    use HasFactory;
    protected $table = 'kota';
    protected $primaryKey = 'gid';
    protected $guarded = ['gid'];
    protected $fillable = [];

    protected $dates = ['created_at', 'updated_at'];
}
