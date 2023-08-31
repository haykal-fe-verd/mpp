<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pengaduan extends Model
{
    use HasFactory;

    protected $table = "tb_pengaduan";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function instansi(): BelongsTo
    {
        return $this->belongsTo(Instansi::class);
    }
}
