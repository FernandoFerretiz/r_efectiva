<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Alumnos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->bigIncrements('id_alumno');
            $table->text('nombres');
            $table->text('apellidos');
            $table->text('matricula');
            $table->text('curp');
            $table->text('email');
            $table->date('fecha_nacimiento');
            $table->integer('grado');
            $table->boolean('genero');
            $table->datetime('fecha_ingreso');
            $table->boolean('activo')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumnos');
    }
}
