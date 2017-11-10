import DependencyMapping from './dependencyMapping';
import { getFunctionParameters, isFunction } from './utils';

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

export default DependencyContainer;