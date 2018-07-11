module.exports = {

    normalizeErrors:(error)=>{

        let normalizeErrors=[]
        
        for (let property in error) {
            if (error.hasOwnProperty(property)) {
                normalizeErrors.push({title:property, detail:error[property].message})
            }
        }

        return normalizeErrors;
    }

}