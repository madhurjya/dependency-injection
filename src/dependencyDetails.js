import ParameterMapper from './parameterMapper';
import PropertyMapper from './propertyMapper';
import { getFunctionParameters, isFunction } from './utils';

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

export default DependencyDetails;