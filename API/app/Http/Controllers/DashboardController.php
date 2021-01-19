<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function lista_alumnos(){
        
        $assets = [
            'css'=>[
            ],
            'js'=>[
                'js/Class/mainClass.js',
                'js/Class/alumnos.js',
                'js/Alumnos/lista.js',
            ]
        ];

        $vars = [
            'title' => 'Lista de alumnos',
            'assets'=>  $assets,
        ];

        return view('main',$vars);
    }
}
