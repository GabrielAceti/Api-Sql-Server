export default class Costumer{

    private date: Date;
    private name: String;
    private fantasyName: String;
    private address: String;
    private telephone: String;
    private observation: String;
    private type: String;

    constructor(date: Date, name: String, fantasyName: String, address: String, telephone: String, observation: String, type: String){
        this.date = date;
        this.name = name;
        this.fantasyName = fantasyName;
        this.address = address;
        this.telephone = telephone;
        this.observation = observation;
        this.type = type;
    }

}

