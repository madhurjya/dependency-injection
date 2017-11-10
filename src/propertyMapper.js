import ParameterDetails from './parameterDetails';

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

export default PropertyMapper;