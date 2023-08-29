<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Layanan extends Model
{
    use HasFactory;

    protected $table = "tb_layanan";
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    public function instansi(): BelongsTo
    {
        return $this->belongsTo(Instansi::class);
    }
}
