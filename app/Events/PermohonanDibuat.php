<?php

namespace App\Events;

use App\Models\Permohonan;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PermohonanDibuat implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $permohonan, $message;

    public function __construct(Permohonan $permohonan, $message)
    {
        $this->permohonan = $permohonan;
        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        return ['admin-masyarakat'];
    }

    public function broadcastAs()
    {
        return 'PermohonanDibuat';
    }
}
