import DependencyContainer from './dependencyContainer';
import ParameterDetails from './parameterDetails';

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

export default ParameterMapper;