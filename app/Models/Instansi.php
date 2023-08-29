<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Instansi extends Model
{
    use HasFactory;

    protected $table = "tb_instansi";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function layanan(): HasMany
    {
        return $this->hasMany(Layanan::class);
    }
}
