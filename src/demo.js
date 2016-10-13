import { DependencyContainer as DI } from './dependency';

class SqlDataService {
    constructor() {
        this._name = 'Sql';
    }
}

class OracleDataService {
    constructor() {
        this._name = 'Oracle';
    }
}

class MyCollection {
    constructor(size, dataService) {
        this._size = size;
        this._dataService = dataService;
    }
    get maxSize() {
        return this._maxSize;
    }
    set maxSize(value) {
        this._maxSize = value;
    }
}

DI.register('dataservice').asType(SqlDataService);
DI.register('dataservice').asType(SqlDataService, 'sql');
DI.register('dataservice').asType(OracleDataService, 'oracle');

DI.register('collection').asType(Map);
DI.register('collection').asType(Set, 'set');
DI.register('collection')
    .asType(MyCollection, 'my')
    .withConstructor(ctor => {
        ctor.param('size').asValue(5);
        ctor.param('dataService').asDependency('dataservice');
    })
    .withProperties(props => {
        props.property('maxSize').asValue(55);
    })
    .inSingletonScope();

const resolvedInstance = DI.resolve('collection', 'my');
const anotherResolvedInstance = DI.resolve('collection', 'my');
console.log(resolvedInstance);
console.log(`Is Singleton: ${resolvedInstance === anotherResolvedInstance}`);

DI.inject(function (dataservice, collection) {
    console.log(`Data service: ${dataservice}`);
    console.log(`Collection: ${collection}`);
})