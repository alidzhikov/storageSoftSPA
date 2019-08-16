export function firstCharToUppercase(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getValueFromKey(element, fieldName){
    const split = fieldName.split('.');
    split.map(key => element = element[key]);
    return element;
}

// key in format key1.key2.key3 etc.
export function setValueFromKey(element, fieldName, value){
    const split = fieldName.split('.');
    const fieldKey = split.shift();
    Object.keys(element).forEach(function(key) {
        if(key !== fieldKey) return;
        if(split.length > 0){
            element[key] = setValueFromKey(element[key], split.join(','), value);
        }else{
            element[key] = value;
        }
    });
    return element;
}