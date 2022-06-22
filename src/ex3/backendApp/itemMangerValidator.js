        export class ItemManagerValidator {
        
            constructor() { 
                this.isNumberRegex = /^[0-9]+$/;
                this.isListRegex = /^[0-9, ]+$/;
            }
        
            isNumber(value) {
                return this.isNumberRegex.test(value);
            }
        
            isList(value) {
                try {
                    if(this.isListRegex.test(value)) {
                        let listToCatch = value.replaceAll(",",' ');
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
                return (!str || /^\s*$/.test(str));
            }
        }