<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Masyarakat extends Model
{

    use HasFactory;

    protected $table = "tb_masyarakat";
    protected $primaryKey = 'id';
    protected $guarded = [];
    protected $dates = ['tanggal_lahir'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
