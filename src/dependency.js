const _registrations = new Map();

class DependencyContainer {
    static isRegistered(registrationName) {
        return _registrations.has(registrationName);
    }
    static register(name) {
        if (!_registrations.has(name)) {
            _registrations.set(name, new DependencyMapping());
        }
        return _registrations.get(name);
    }
    static resolve(registrationName, mappingName) {
        if (!_registrations.has(registrationName)) {
            throw new Error(`${registrationName} is not registered.`);
        }
        const dependencyMapping = _registrations.get(registrationName);
        if (!dependencyMapping._mappings.has(mappingName)) {
            throw new Error(`Mapping ${mappingName} is not registered.`);
        }
        const dependencyDetails = dependencyMapping._mappings.get(mappingName);
        return dependencyDetails._resolve();
    }
    static inject(func) {
        if (!isFunction(func)) {
            throw new TypeError('Must be a function of class');
        }
        const funcArguments = getFunctionParameters(func)
            .map(param => {
                return DependencyContainer.resolve(param);
            });
        return func(...funcArguments);
    }
}

class DependencyMapping {
    constructor() {
        this._mappings = new Map();
    }
    asType(type, mappingName) {
        if (this._mappings.has(mappingName)) {
            throw new Error(`${mappingName || 'default'} mapping is already registered.`);
        }
        const dependencyDetails = new DependencyDetails(type);
        this._mappings.set(mappingName, dependencyDetails);
        return dependencyDetails;
    }
}

class DependencyDetails {
    constructor(type) {
        this._type = type;
        this._resolveWithConstructor = false;
        this._constructorParameterMapper = null;
        this._resolvePropertyValues = false;
        this._propertyValueMapper = false;
        this._isInSingletonScope = false;
        this._resolvedInstance = null;
    }
    withConstructor(parameterMapperFunc) {
        if (this._resolveWithConstructor === true) {
            throw new Error('Constructor is already configured.');
        }
        this._resolveWithConstructor = true;
        this._constructorParameterMapper = new ParameterMapper(getFunctionParameters(this._type));
        if (isFunction(parameterMapperFunc)) {
            parameterMapperFunc(this._constructorParameterMapper);
        }
        return this;
    }

    withProperties(propertyValueMapperFunc) {
        if (this._resolvePropertyValues === true) {
            throw new Error('Property values are already configured.');
        }
        this._resolvePropertyValues = true;
        this._propertyValueMapper = new PropertyMapper();
        if (isFunction(propertyValueMapperFunc)) {
            propertyValueMapperFunc(this._propertyValueMapper);
        }
        return this;
    }

    inSingletonScope() {
        this._isInSingletonScope = true;
    }

    _resolve() {
        if (this._isInSingletonScope && this._resolvedInstance) {
            return this._resolvedInstance;
        } else {
            if (this._resolveWithConstructor === true) {
                const constructorArguments = this._constructorParameterMapper._resolve();
                this._resolvedInstance = new this._type(...constructorArguments);
            } else {
                this._resolvedInstance = new this._type();
            }
            if (this._resolvePropertyValues === true) {
                this._propertyValueMapper._resolve()
                    .forEach(([name, value]) => {
                        this._resolvedInstance[name] = value;
                    });
            }
            return this._resolvedInstance;
        }
    }
}

class ParameterMapper {
    constructor(parameterNames) {
        this._parameterMap = new Map(
            parameterNames
                .map(param => [param, new ParameterDetails(param)])
        );
    }
    param(name) {
        if (!this._parameterMap.has(name)) {
            throw new Error(`Parameter "${name}" was not detected.`);
        }
        return this._parameterMap.get(name);
    }

    _resolve() {
        return [...this._parameterMap.values()].map(param => param._resolve());
    }
}

class PropertyMapper {
    constructor() {
        this._propertyMap = new Map();
    }
    property(name) {
        if (!this._propertyMap.has(name)) {
            this._propertyMap.set(name, new ParameterDetails(name));
        }
        return this._propertyMap.get(name);
    }
    _resolve() {
        return [...this._propertyMap.entries()]
            .map(([name, prop]) => [name, prop._resolve()]);
    }
}

class ParameterDetails {
    constructor(parameterName) {
        this._name = parameterName;

        this._resolveAsValue = false;
        this._valueToResolve = null;

        this._resolveAsDependency = false;
        this._registrationNameToResolve = null;
        this._mappingNameToResolve = null;
    }
    asValue(valueToResolve) {
        this._resolveAsValue = true;
        this._valueToResolve = valueToResolve;
    }
    asDependency(registrationName, mappingName) {
        this._resolveAsDependency = true;
        this._registrationNameToResolve = registrationName;
        this._mappingNameToResolve = mappingName;
    }

    _resolve() {
        if (this._resolveAsValue) {
            return this._valueToResolve;
        } else if (this._resolveAsDependency) {
            return DependencyContainer.resolve(this._registrationNameToResolve,
                this._mappingNameToResolve);
        }
    }
}

function isFunction(func) {
    return typeof func === 'function';
}

function getFunctionParameters(func) {
    const paramExtract = func.toString()
        .match(/\s*function[^(]*\(([^)]*)\)/);
    if (paramExtract && paramExtract.length === 2) {
        return paramExtract[1]
            .split(',')
            .map(param => param.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').trim());
    } else {
        throw new Error('Unable to fetch parameter details.');
    }
}

export { DependencyContainer };