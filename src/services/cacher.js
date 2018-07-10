import camelCase from 'camel-case';

let instance=null

export class Cacher{

    constructor()
    {
        if(!instance){
            instance=this
        }

        return instance
    }


    cache={};

    isValueCached=(key)=>this.getCachedValue(key)

    cacheValue=(key,value)=>this.cache[camelCase(key)]=value;

    getCachedValue=(key)=>this.cache[camelCase(key)]
}