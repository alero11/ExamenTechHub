angular.module('appAdmHorario', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('altaAula', {
                url: '/altaAula',
                templateUrl: 'views/altaAula.html',
                controller: 'ctrlAltaAula'             
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

        comun.tareas = [];

        comun.tarea = {};
        /*        comun.tareas = [{
                        nombre: 'comprar comida',
                        prioridad: '0'
                    }, {
                        nombre: 'leer un libro',
                        prioridad: '1'
                    }, {
                        nombre: 'ir al cine',
                        prioridad: '2'
                    }]*/
        // instancia objeto tarea

        // funcion eliminar
        comun.eliminar = function(tarea) {
                var indice = comun.tareas.indexOf(tarea);
                comun.tareas.splice(indice, 1);
            }
            /********** Secccion de metodos remotos **********************/

        comun.getAll = function() {

            return $http.get('/tareas')
                // si todo es correcto
                // se parsea a data como un arreglo
                .then(function(data) {
                    // permite guardar en todos los niveles
                    angular.copy(data, comun.tareas)
                        // asigna los datos al arreglo                                        
                    return comun.tareas
                })
                .catch(function(response) {
                    console.error('Error occurred:', response.status, response.data);
                })
                .finally(function() {
                    console.log("Task Finished.");
                });
        }

        // retorna comun
        return comun;
    })
    .controller('ctrlAltaAula', function($scope, $state, comun) {
        // instancia el objeto tarea
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

        $scope.eliminar = function(tarea) {
            comun.eliminar(tarea);
        }       
    })
    // controler para editar
    .controller('ctrlEditar', function($scope, $state, comun) {
        // pasa los datos de comun
        $scope.tarea = comun.tarea;

        $scope.actualizar = function() {
            var indice = comun.tareas.indexOf($scope.tarea);
            comun.tareas[indice] = $scope.tarea;
            $state.go('alta');
        }

        $scope.eliminar = function() {
            comun.eliminar($scope.tarea);
            $state.go('alta');
        }
    })
