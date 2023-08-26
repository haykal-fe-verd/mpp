<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('guest/home/index');
    }

    public function about(): Response
    {
        return Inertia::render('guest/about/index');
    }
}
