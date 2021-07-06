import Connection from '../../data/Index'
import { Request, Response} from 'express';
import Costumer from '../models/Costumer'

const Tedious = require('tedious');
const TediousRequest = Tedious.Request;

class CostumerController {

        create(req: Request, res: Response){

        const {date, name, fantasyName, address, telephone, observation, type} = req.body;

        let request =  new TediousRequest(`USE ALTF_ERP INSERT INTO FCFO(DATAINCLUSAO, NOME, NOMEFANTASIA, RUA, TELEFONE1, OBSERVACAO, TIPO) VALUES('${date}', '${name}', '${fantasyName}', '${address}', '${telephone}', '${observation}', '${type}')`, (err: any, rowCount: any) =>{
            if(err){
                return res.status(400).json(err);
            }
            else{
                return res.status(200).json("Sucesso");
            }
        });    
        
        Connection.execSql(request);
    } 
    
     get(req: Request, res: Response){

        var row: String[] = [];
        var costumers: Costumer[] = [];

        let request =  new TediousRequest("USE ALTF_ERP SELECT * FROM FCFO", (err: any, rowCount: any) =>{
            if(err){
                return res.status(400).json(err);
            }
            else{                
                return res.status(200).json(costumers);
            }
        });  
        
        
        request.on('row', function(columns: any[]) {

            row.length = 0;
            columns.forEach(function(column: { value: any; }) {
              row.push(column.value);              
            });

            const costumer = new Costumer(new Date(row[0].toString()) , row[1], row[2], row[3], row[4], row[5], row[6])
            costumers.push(costumer);
            
          });       

          Connection.execSql(request);          
    } 
    
    put(req: Request, res: Response){
         const {date, name, fantasyName, address, telephone, observation, type} = req.body;
         const { _id } = req.params;

         let request = new TediousRequest(`USE ALTF_ERP UPDATE FCFO SET NOME = '${name}', NOMEFANTASIA = '${fantasyName}', RUA = '${address}', TELEFONE1 = '${telephone}', OBSERVACAO = '${observation}', TIPO = '${type}' WHERE IDFCFO = ${_id}`, (err: Error, rowCount: Number) => {
             if(err){
                 res.status(400).json(err);
             }
             else{
                 res.status(200).json("Sucesso");
             }
         });
         
         Connection.execSql(request);
    }
    
}

export default CostumerController