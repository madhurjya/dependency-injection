'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dependency = require('./dependency');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlDataService = function SqlDataService() {
    _classCallCheck(this, SqlDataService);

    this._name = 'Sql';
};

var OracleDataService = function OracleDataService() {
    _classCallCheck(this, OracleDataService);

    this._name = 'Oracle';
};

var MyCollection = function () {
    function MyCollection(size, dataService) {
        _classCallCheck(this, MyCollection);

        this._size = size;
        this._dataService = dataService;
    }

    _createClass(MyCollection, [{
        key: 'maxSize',
        get: function get() {
            return this._maxSize;
        },
        set: function set(value) {
            this._maxSize = value;
        }
    }]);

    return MyCollection;
}();

_dependency.DependencyContainer.register('dataservice').asType(SqlDataService);
_dependency.DependencyContainer.register('dataservice').asType(SqlDataService, 'sql');
_dependency.DependencyContainer.register('dataservice').asType(OracleDataService, 'oracle');

_dependency.DependencyContainer.register('collection').asType(Map);
_dependency.DependencyContainer.register('collection').asType(Set, 'set');
_dependency.DependencyContainer.register('collection').asType(MyCollection, 'my').withConstructor(function (ctor) {
    ctor.param('size').asValue(5);
    ctor.param('dataService').asDependency('dataservice');
}).withProperties(function (props) {
    props.property('maxSize').asValue(55);
}).inSingletonScope();

var resolvedInstance = _dependency.DependencyContainer.resolve('collection', 'my');
var anotherResolvedInstance = _dependency.DependencyContainer.resolve('collection', 'my');
console.log(resolvedInstance);
console.log('Is Singleton: ' + (resolvedInstance === anotherResolvedInstance));

_dependency.DependencyContainer.inject(function (dataservice, collection) {
    console.log('Data service: ' + dataservice);
    console.log('Collection: ' + collection);
});
//# sourceMappingURL=demo.js.map