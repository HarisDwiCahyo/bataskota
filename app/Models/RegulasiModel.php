<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegulasiModel extends Model
{
    use HasFactory;
    protected $table = 'regulasi';
    protected $primaryKey = 'id';
    protected $guarded = ['id'];
    protected $fillable = [];

    public $timestamps = false;
}