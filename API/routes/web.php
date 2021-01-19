<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/Alumnos/Traer','AlumnosController@traer');
Route::get('/Alumnos/Traer/Por','AlumnosController@traerPor');
Route::get('/Alumnos/Traer/Activos','AlumnosController@traerActivos');
Route::get('/Alumnos/Guardar','AlumnosController@guardar');
Route::get('/Alumnos/Activar-desactivar','AlumnosController@cambiarStatus');