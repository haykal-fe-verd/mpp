<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Persyaratan extends Model
{
    use HasFactory;

    protected $table = "tb_persyaratan";
    protected $primaryKey = 'id';

    public function layanan(): BelongsTo
    {
        return $this->belongsTo(Layanan::class);
    }
}
