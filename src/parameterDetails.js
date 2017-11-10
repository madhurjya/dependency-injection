import DependencyContainer from './dependencyContainer';

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

export default ParameterDetails;