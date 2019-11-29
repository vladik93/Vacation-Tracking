export class User {
    constructor(
        public username: string,
        public password: string,
        public id?: number,
        public first_name?: string,
        public last_name?: string,
        public admin?: any
    ) {}
}

