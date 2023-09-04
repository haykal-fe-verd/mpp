<?php

namespace App\Notifications;

use App\Models\Permohonan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PermohonanNotification extends Notification
{
    use Queueable;

    public $permohonan, $message, $href;

    public function __construct($permohonan, $message, $href)
    {
        $this->permohonan = $permohonan;
        $this->message = $message;
        $this->href = $href;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $permohonanData = [
            "id" => $this->permohonan->id,
            "status" => $this->permohonan->status,
            "no_resi" => $this->permohonan->no_resi,
            "pesan" => $this->permohonan->pesan,
            "file" => $this->permohonan->file,
            "masyarakat_id" => $this->permohonan->masyarakat_id,
            "layanan_id" => $this->permohonan->layanan_id,
            "created_at" => $this->permohonan->created_at,
            "updated_at" => $this->permohonan->updated_at,
        ];

        return [
            "href" => $this->href,
            "permohonan" => $permohonanData,
            "message" => $this->message,
            'time' => \Carbon\Carbon::now(),
            'user_id' => auth()->user()->id,
            'user_name' => auth()->user()->name,
            'user_emai' => auth()->user()->email,
        ];
    }
}
