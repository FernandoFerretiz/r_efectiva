<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AlumnosController extends Controller
{
    private $key_auth = 'dYq0pnLXoaECnjvovlie';
    private $arr = [
        
        1=>'call getAllAlumnos()',
        2=>'call traerAlumnosPorGrado(?)',
        3=>'call traerAlumnosPorNombre(?)',
        4=>'call traerAlumnosPorApellido(?)',
        5=>'call traerAlumnosPorCURP(?)',
        6=>'call traerAlumnosPorID(?)',
        'guardar'=>'call guardarAlumno(?,?,?,?,?,?,?,?,?)',
        'editar'=>'call editarAlumno(?,?,?,?,?,?,?,?,?)',
        'status'=>'call cambiarStatus(?)',
        'activos'=>'call traerActivos(?)'
    ];

    public function traer(Request $request){
        $_AUTH =  $request->header('Authorization');

        if($_AUTH !== 'dYq0pnLXoaECnjvovlie'){
            return [
                'error'=>'Header autorización incorrecto'
            ];
        }

        
        return DB::select('call getAllAlumnos()');


    }
    public function traerPor(Request $request){
        $_AUTH =  $request->header('Authorization');

        if($_AUTH !== 'dYq0pnLXoaECnjvovlie'){
            return [
                'error'=>'Header autorización incorrecto'
            ];
        }

        

        
        
        $results =  DB::select($this->arr[$request->type],[$request->value]);
        
        return $results;
    }
    
    public function guardar(Request $request){
    
        $_AUTH =  $request->header('Authorization');

        if($_AUTH !== 'dYq0pnLXoaECnjvovlie'){
            return [
                'error'=>'Header autorización incorrecto'
            ];
        }

        $update = false;

        if(isset($request->id)){
            $results =  DB::select($this->arr[6],[$request->id]);
            
            if(isset($results[0])) $update = true;
        }
        
        $arr    = [];

        for($i  = 0; $i<8; $i++) $arr[$i] = $request->vars[$i];
        
        if(!$update){

            $arr[8] =   date('Y-m-d H:i:s');
            $query  =  DB::select($this->arr['guardar'],$arr);
        }else{
                    
            $arr[8] = $request->id;
            $query  =  DB::select($this->arr['editar'],$arr);
        }
        
        
    }
    public function cambiarStatus(Request $request){
        
        $_AUTH =  $request->header('Authorization');
        
        if($_AUTH !== 'dYq0pnLXoaECnjvovlie'){
            return [
                'error'=>'Header autorización incorrecto'
            ];
        }
        
        $update = false;
        
        if(isset($request->id)){
            $results =  DB::select($this->arr[6],[$request->id]);
            
            if(isset($results[0])){
                $query  =  DB::select($this->arr['status'],[$request->id]);
                
                return [
                    'error'=>false,
                    'activo'=> !$results[0]->activo
                ];
            
            }else{

                return [
                    'error'=>true,
                ];
            }
        }else{
            return [
                'error'=>true,
            ];
        }

    }
    public function traerActivos(Request $request){
        
        $_AUTH =  $request->header('Authorization');
        
        if($_AUTH !== 'dYq0pnLXoaECnjvovlie'){
            return [
                'error'=>'Header autorización incorrecto'
            ];
        }
        
        return DB::select('call traerActivos(1)');
    }
}
