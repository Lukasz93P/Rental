import titleize from 'titleize';


export const rentalType=isShared=>isShared ? 'shared' : 'entire';

export const capitalize=string=>string ? titleize(string) : ""

