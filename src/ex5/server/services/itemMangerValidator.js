class ItemManagerValidator {
    constructor() { 
        this.isListRegex = /^[0-9, ]+$/;
        this.isWhiteSpacesOnlyRegex = /^\s*$/;
    }
    isNumber(value) {
        return !isNaN(Number(value));
    }
    isList(candidateToBeList) {
        try {
            if(this.isListRegex.test(candidateToBeList)) {
                let listToCatch = candidateToBeList.replaceAll(",",' ');
                listToCatch = listToCatch.split(/[ ]+/);
                let arrToCatch = [];
                listToCatch.forEach(value => {
                    if (value !== ''){
                        arrToCatch.push(value);
                    }
                })
                return arrToCatch;
        }
        return false;
        } catch(error) {
            return false;
        }
    }
    isInputBlank(str) {
        return (!str || this.isWhiteSpacesOnlyRegex.test(str));
    }
}

module.exports = ItemManagerValidator;