import DependencyDetails from './dependencyDetails';

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

export default DependencyMapping;