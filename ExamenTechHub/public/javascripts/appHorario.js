angular.module('appAdmHorario', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('inicio', {
                url: '/inicio',
                templateUrl: 'inicio.html'
            })
            .state('altaAula', {
                url: '/altaAula',
                templateUrl: 'views/altaAula.html',
                controller: 'ctrlAltaAula'
            })
            .state('editarAula', {
                url: '/editarAula',
                templateUrl: 'views/editarAula.html',
                controller: 'ctrleditarAula'
            })
            .state('altaDocente', {
                url: '/altaDocente',
                templateUrl: 'views/altaDocente.html',
                controller: 'ctrlAltaDocente'
            })
            .state('editarDocente', {
                url: '/editarDocente',
                templateUrl: 'views/editarDocente.html',
                controller: 'ctrlEditarDocente'
            })
            .state('altaHorario', {
                url: '/altaHorario',
                templateUrl: 'views/altaHorario.html',
                controller: 'ctrlAltaHorario'
            })
            .state('altaMateria', {
                url: '/altaMateria',
                templateUrl: 'views/altaMateria.html',
                controller: 'ctrlAltaMateria'
            });

        $urlRouterProvider.otherwise('inicio');
    })
    //FACTORY. servicio que permite mantener informacion 
    //vigente a lo largo de las vistas 
    //$http permite consumir GET PUT POST DELETE
    .factory('comun', function($http) {
        //instancia de objeto        
        var comun = {};
        // instancia los arrays 
        comun.aulas = [];
        comun.docentes = [];
        // funcion eliminar
        comun.eliminarAula = function(aula) {
            var indice = comun.aulas.indexOf(aula);
            comun.aulas.splice(indice, 1);
        }

        comun.eliminarDocente = function(docente) {
                var indice = comun.docentes.indexOf(docente);
                comun.docentes.splice(indice, 1);
        }
        
        // metodos remotos GET POST PUT DELETE

        comun.obtieneAulas = function(){
            return $http.get('/aulas')
            .then(function(data){
                
                angular.copy(data,comun.aulas)

                return comun.aulas
            })
        }

        comun.adicionaAula = function(aula){
            return $http.post('/aula', aula)
            .then(function(aula){
                //var ColAulas = comun.obtieneAulas();
                //var cantidadAulas = ColAulas.length;

                comun.aulas.push(aula);    
            })
        }

        // retorna comun
        return comun;
    })
    .controller('ctrlAltaAula', function($scope, $state, comun) {
        // instancia el objeto aula
        $scope.aula = {}
        
        comun.obtieneAulas();
        // obtiene los datos de factory
        $scope.aulas = comun.aulas;
        // funcion
        $scope.agregar = function() {
            
            comun.adicionaAula({
                nombre: $scope.aula.nombre//,
                //id_aula: 2
            })

            $scope.aula.nombre = '';



/*            $scope.aulas.push({
                nombre: $scope.aula.nombre
            })*/
        }

        $scope.eliminar = function(aula) {
            comun.eliminarAula(aula);
        }

        $scope.editaAula = function(aula) {
            // guarda la informacion del objeto
            comun.aula = aula;
            // envia al estado editar
            $state.go('editarAula');
        }
    })
    // controler para editar
    .controller('ctrleditarAula', function($scope, $state, comun) {
        // pasa los datos de comun
        $scope.aula = comun.aula;

        $scope.actualizar = function() {
            var indice = comun.aulas.indexOf($scope.aula);
            comun.aulas[indice] = $scope.aula;
            $state.go('altaAula');
        }

        $scope.eliminar = function() {
            comun.eliminarAula($scope.aula);
            $state.go('altaAula');
        }
    })
    .controller('ctrlAltaDocente', function($scope, $state, comun) {
        // instancia el objeto aula
        $scope.docente = {}
            // instancia del arrays
        $scope.docentes = [];
        // obtiene los datos de factory
        $scope.docentes = comun.docentes;
        // funcion
        $scope.agregar = function() {
            $scope.docentes.push({
                nombres: $scope.docente.nombres,
                apellidos: $scope.docente.apellidos,
                telefono: $scope.docente.telefono,
                celular: $scope.docente.celular
            })
        }

        $scope.eliminar = function(docente) {
            comun.eliminarDocente(docente);
        }

        $scope.editaDocente = function(docente) {
            // guarda la informacion del objeto
            comun.docente = docente;
            // envia al estado editar
            $state.go('editarDocente');
        }
    })
    // controler para editar
    .controller('ctrlEditarDocente', function($scope, $state, comun) {
        // pasa los datos de comun
        $scope.docente = comun.docente;

        $scope.actualizar = function() {
            var indice = comun.docentes.indexOf($scope.docente);
            comun.docentes[indice] = $scope.docente;
            $state.go('altaDocente');
        }

        $scope.eliminar = function() {
            comun.eliminarDocente($scope.docente);
            $state.go('altaDocente');
        }
    })
