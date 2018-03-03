angular.module('appAdmHorario', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
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

        $urlRouterProvider.otherwise('altaAula');
    })
    //FACTORY. servicio que permite mantener informacion 
    //vigente a lo largo de las vistas 
    //$http permite consumir GET PUT POST DELETE
    .factory('comun', function($http) {

        //instancia de objeto        
        var comun = {};

        comun.aulas = [];

        comun.aula = {};

        // instancia objeto tarea

        // funcion eliminar
        comun.eliminarAula = function(aula) {
            var indice = comun.aulas.indexOf(aula);
            comun.aulas.splice(indice, 1);
        }

        // retorna comun
        return comun;
    })
    .controller('ctrlAltaAula', function($scope, $state, comun) {
        // instancia el objeto aula
        $scope.aula = {}
            // instancia del arrays
        $scope.aulas = [];
        // obtiene los datos de factory
        $scope.aulas = comun.aulas;
        // funcion
        $scope.agregar = function() {
            $scope.aulas.push({
                nombre: $scope.aula.nombre
            })
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
