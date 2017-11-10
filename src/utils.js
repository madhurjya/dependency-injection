
export function isFunction(func) {
    return typeof func === 'function';
}

export function getFunctionParameters(func) {
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