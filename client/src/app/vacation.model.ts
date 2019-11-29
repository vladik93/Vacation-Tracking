export class Vacation {
    constructor(
       public id: string,
       public description: string,
       public destination: string,
       public image: string,
       public checked_image: string,
       public start_date: string,
       public end_date: string,
       public start_date_format: Date,
       public end_date_format: Date,
       public price: Number,
       public follow_count?: Number
    ) {}
}



