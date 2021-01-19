class AlumnosClass extends MainClass{

    
    preparelist(config){
        this.listaalumnos = {};
        document.getElementById('titleApp').innerHTML = 'Lista de alumnos';
        document.querySelector(config.QS).innerHTML = `
        <div class="row">
            <div class="col-4">
                <div class="input-group mb-3">
                    <select class="form-control" id="buscar_por">
                        <option value="0" selected disabled>Buscar por...</option>
                        <option value="1" >Todos</option>
                        <option value="2" >Grado</option>
                        <option value="3" >Nombre</option>
                        <option value="4" >Apellido</option>
                        <option value="5" >CURP</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Seleccione una opción para buscar" id="busqueda">
                    
                </div>
            </div>
            <div class="col-4">
                <div class="input-group mb-3">
                <button class="btn btn-primary btn-block" id="btnbuscar"><i class="fas fa-search"></i></button>
                    
                    
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12" id="tableAlumnos">
            </div>
        </div>
        `

        document.getElementById('buscar_por').addEventListener('change',()=>{
            let sel = document.getElementById('buscar_por');
            let txtSearchby = sel.options[sel.selectedIndex].text;
            document.getElementById('busqueda').placeholder = txtSearchby;

        })

        this.imprimirLista({
            place: "#tableAlumnos",
        });
        if(typeof config.QS !== 'undefined'){
            let evntadd = this.fn_agregar_editar;
            let _this   = this;
            
            document.getElementById('agregaralumno').addEventListener('click',()=>{
                evntadd(false)
            });

            let fnGetAll = ()=>{
                this.httpRequest({
                    urlRequest  : assets+'Alumnos/Traer',
                    header      : {
                        name: 'Authorization',
                        value: 'dYq0pnLXoaECnjvovlie'
                    },
                    onSuccess   : (r)=>{
                        _this.listaalumnos = r;
                        _this.imprimirLista({
                            place: '#tableAlumnos',
                        });
                    }
                });
            }
            
            fnGetAll();
            
            document.getElementById('btnbuscar').addEventListener('click',()=>{
                if(document.getElementById('buscar_por').value == 1){
                    fnGetAll()
                }else{
                    _this.httpRequest({
                        urlRequest  : assets+'Alumnos/Traer/Por?type='+document.getElementById('buscar_por').value+'&value='+document.getElementById('busqueda').value,
                        header      : {
                            name: 'Authorization',
                            value: 'dYq0pnLXoaECnjvovlie'
                        },
                        onSuccess   : (r)=>{
                            _this.listaalumnos = r;
                            _this.imprimirLista({
                                place: '#tableAlumnos',
                            });
                        }
                    });
                }
            });

            
            

        }else{
            console.log('Query Selector is not defined!');
        }
    }

    imprimirLista(config){
        let list = this.listaalumnos;
        let place = document.querySelector(config.place);
        let sel = document.getElementById('buscar_por');
        let txtSearchby = sel.options[sel.selectedIndex].text;
        let _this = this;

        place.innerHTML = `
        ${document.getElementById('buscar_por').value > 0 ? `<h3>Buscando por: ${txtSearchby}</h3>` : '<h3>&nbsp;</h3>'}
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>CURP</th>
                        <th>Grado</th>
                        <th>Genero</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
        `;
        let template = '';
        let keys = Object.keys(list);
        for(let i = 0; i< keys.length; i++){
            let k = keys[i];
            template += ''+`
            <tr >
                <td>${list[k].matricula}</td>
                <td>${list[k].nombres}</td>
                <td>${list[k].apellidos}</td>
                <td>${list[k].email}</td>
                <td>${list[k].curp}</td>
                <td>${list[k].grado}</td>
                <td>${list[k].genero == 1? 'Masculino' : 'Femenino'}</td>
                <td>
                    <div class="form-check">
                        <input class="form-check-input position-static inputcheck" type="checkbox"  value="${list[k].id_alumno}" ${list[k].activo? 'checked' : ''} >
                    </div>
                </td>
                <td><button class="btn btn-primary btn-xs btneditar" k="${list[k].id_alumno}"><i class="fas fa-edit" k="${list[k].id_alumno}"></i></button></td>
            </tr>
            `;
        }

        document.querySelector(config.place+' tbody').innerHTML = template;
        document.querySelectorAll('.btneditar').forEach(element => {
            element.addEventListener('click',function(e){
                
                _this.fn_agregar_editar(e.target.getAttribute('k'))
            });
        });

        document.querySelectorAll('.inputcheck').forEach(element => {
            element.addEventListener('change',function(e){
                
                _this.httpRequest({
                    urlRequest  : assets+'Alumnos/Activar-desactivar?type=6&id='+e.target.value,
                    header      : {
                        name: 'Authorization',
                        value: 'dYq0pnLXoaECnjvovlie'
                    },
                    onSuccess   : (r)=>{
    
                        if(!r.error){
                            $.notify({
                                title: 'Acción realizada cón éxito',
                                text: `El alumno ha sido ${ !r.activo? 'dado de baja ' : ' reactivado' } correctamente`,
                                image: "<i class='fas fa-times'></i>"
                            }, {
                                style: 'metro',
                                className: 'success',
                                autoHide: false,
                                clickToHide: true
                            });
                        }
                       
                    }
                });
            });
        });
    }

    fn_agregar_editar(id = false){
        $('#modal01').modal({});
        var _this = this;

        document.getElementById('modal01title').innerHTML = id ? 'Editar Alumno' : 'Agregar Alumno';
        document.querySelector('#modal01 .modal-body').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="n1">Nombre</label>
                    <input type="text" class="form-control" id="n1">
                    <small id="n1Help" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="n2">Apellido</label>
                    <input type="text" class="form-control" id="n2">
                    <small id="n2Help" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="email">E-Mail</label>
                    <input type="text" class="form-control" id="email">
                    <small id="emailHelp" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="curp">CURP</label>
                    <input type="text" class="form-control" id="curp">
                    <small id="n1Help" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="grado">Grado</label>
                    <input type="text" class="form-control" id="grado">
                    <small id="n1Help" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="matricula">Matricula</label>
                    <input type="text" class="form-control" id="matricula">
                    <small id="n1Help" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="gender">Genero</label>
                    <select class="form-control" id="gender">
                        <option value="-1" selected disabled>Seleccione una opción</option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                    </select>
                    <small id="genderHelp" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="dob">Fecha de nacimiento</label>
                    <input type="text" class="form-control" id="dob">
                    <small id="n1Help" class="form-text text-muted d-none">We'll never share your email with anyone else.</small>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6 mx-auto">
                <button class="btn btn-primary btn-block" id="btnsalvaralumno">Guardar <i class="fas fa-save"></i></button>
            </div>
        </div>
        `;
        if(id){
            this.httpRequest({
                urlRequest  : assets+'Alumnos/Traer/Por?type=6&value='+id,
                header      : {
                    name: 'Authorization',
                    value: 'dYq0pnLXoaECnjvovlie'
                },
                onSuccess   : (r)=>{

                    document.getElementById('n1').value         = r[0].nombres;
                    document.getElementById('n2').value         = r[0].apellidos;
                    document.getElementById('email').value      = r[0].email;
                    document.getElementById('curp').value       = r[0].curp;
                    document.getElementById('matricula').value  = r[0].matricula;
                    document.getElementById('grado').value      = r[0].grado;
                    document.getElementById('gender').value     = r[0].genero;
                    document.getElementById('dob').value        = moment(r[0].fecha_nacimiento).format('YYYY-MM-DD');
                   
                }
            });
        }
        document.getElementById('btnsalvaralumno').addEventListener('click',function(){
            let varsget = '';
            let ok      = true;
            let x_this  = new MainClass();
            if(id){
                varsget += '&id='+id
            }
            
            if(document.getElementById('n1').value.length < 5){
                ok = false;
                
                $.notify({
                    title: 'Revise el nombre',
                    text: 'El nombre que ingreso es muy corto',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[0]='+document.getElementById('n1').value;
                
            }

            if(document.getElementById('n2').value.length < 5){
                ok = false;

                $.notify({
                    title: 'Revise el apellido',
                    text: 'El apellido que ingreso es muy corto',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[1]='+document.getElementById('n2').value;
            }

            if(document.getElementById('email').value.length < 8){
                ok = false;

                $.notify({
                    title: 'Revise el email',
                    text: 'El email que ingreso es muy corto',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[2]='+document.getElementById('matricula').value;
            }
            if(document.getElementById('curp').value.length !== 18){
                ok = false;

                $.notify({
                    title: 'Revise el curp',
                    text: 'El curp debe tener 18 caracteres',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[3]='+document.getElementById('curp').value;
            }

            if(isNaN(document.getElementById('grado').value) 
                  || document.getElementById('grado').value.length > 3 
                  || document.getElementById('grado').value.length < 1){
                ok = false;

                $.notify({
                    title: 'Revise el Grado escolar',
                    text: 'El grado escolar debe ser númerico <Br>y deber contener hasta 3 digitos',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[6]='+document.getElementById('grado').value;
            }
            if(isNaN(document.getElementById('matricula').value) 
                  || document.getElementById('matricula').value.length > 15 
                  || document.getElementById('matricula').value.length < 1){
                ok = false;

                $.notify({
                    title: 'Revise el matricula escolar',
                    text: 'La matricula escolar debe ser númerico <Br>y deber contener hasta 15 digitos',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[4]='+document.getElementById('email').value;
            }
            if(!document.getElementById('gender').value){
                ok = false;

                $.notify({
                    title: 'Revise el genero',
                    text: 'Debe seleccionar una opción para el genero',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[7]='+document.getElementById('gender').value;
            }
            if(!document.getElementById('dob').value){
                ok = false;

                $.notify({
                    title: 'Revise la fecha de nacimiento',
                    text: 'Debe establecer la fecha de nacimiento',
                    image: "<i class='fas fa-times'></i>"
                }, {
                    style: 'metro',
                    className: 'error',
                    autoHide: false,
                    clickToHide: true
                });
            }else{
                varsget += '&vars[5]='+document.getElementById('dob').value;
            }

            console.log(x_this);

            if(ok){
                x_this.httpRequest({
                    urlRequest  : assets+'Alumnos/Guardar/?type=6'+varsget,
                    header      : {
                        name: 'Authorization',
                        value: 'dYq0pnLXoaECnjvovlie'
                    },
                    onSuccess   : (r)=>{
        
                        document.getElementById('buscar_por').value = 1;
                        document.getElementById('btnbuscar').click();

                        $('#modal01').modal('hide');
                       
                    }
                });
            }
            
        })
    }
    
    
    listaActivosPorGrado(config){
        
        
        document.getElementById('titleApp').innerHTML = 'Alumnos activos por grado';
        document.querySelector(config.QS).innerHTML = `
        
        <div class="row">
            <div class="col-12" id="listaActivos">
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Grado</th>
                                <th>Alumnos activos</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
        
        this.httpRequest({
            urlRequest  : assets+'Alumnos/Traer/Activos',
            header      : {
                name: 'Authorization',
                value: 'dYq0pnLXoaECnjvovlie'
            },
            onSuccess   : (r)=>{
                let keys = Object.keys(r);
                let template = '';
                for(let i = 0; i< keys.length; i++){
                    template += ''+`
                    <tr>
                        <td>${r[keys[i]].grado}</td>
                        <td>${r[keys[i]].activos}</td>
                    </tr>
                    `;
                }
                document.querySelector('#listaActivos tbody').innerHTML = template;
            }
        });

    }
    
}