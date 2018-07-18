import titleize from 'titleize';
import * as moment from 'moment'


export const rentalType=isShared=>isShared ? 'shared' : 'entire';

export const capitalize=string=>string ? titleize(string) : ""

export const getRangeOfDates=(startAt,endAt,dateFormat)=>{

    let rangeOfDates=[]

    let start=moment(startAt)
    const end=moment(endAt)
    while(start<end){
        rangeOfDates.push(start.format(dateFormat))
        start.add(1,'day')
    }

    rangeOfDates.push(end.format(dateFormat))

    return rangeOfDates
}

export const firstToUpper = (string)=>{

    let result=""
    if(string && string.length>0)
        result=string.charAt(0).toUpperCase()+string.substring(1).toLowerCase()

    return result

}


export const fieldRequired=()=>{

    return ('This field is required')


}


