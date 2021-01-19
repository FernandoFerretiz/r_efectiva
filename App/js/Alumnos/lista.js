var alumnos = new AlumnosClass();
var listarfn = ()=>{
    alumnos.preparelist({
        QS: '#mainSection'
    });
}

var activosfn = ()=>{
    
    alumnos.listaActivosPorGrado({
        QS: '#mainSection'
    });
}

var __onLoad = ()=>{
    listarfn()
}