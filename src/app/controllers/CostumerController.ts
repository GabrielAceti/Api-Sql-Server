import Connection from '../../data/index'
import { Request, Response} from 'express';
const Tedious = require('tedious');
const TediousRequest = Tedious.Request;

class CostumerController {

       async create(req: Request, res: Response){
        const {date, name, fantasyName, address, telephone, observation, type} = req.body;
        let request = await new TediousRequest(`USE ALTF_ERP INSERT INTO FCFO(DATAINCLUSAO, NOME, NOMEFANTASIA, RUA, TELEFONE1, OBSERVACAO, TIPO) VALUES('${date}', '${name}', '${fantasyName}', '${address}', '${telephone}', '${observation}', '${type}')`, (err: any, rowCount: any) =>{
            if(err){
                return res.status(400).json(err);
            }
            else{
                return res.status(200).json("Sucesso");
            }
        });    
        
        Connection.execSql(request);
    } 
    
    async get(req: Request, res: Response){
        
        let request = await new TediousRequest("USE ALTF_ERP SELECT * FROM FCFO", (err: any, rowCount: any) =>{
            if(err){
                return res.status(400).json(err);
            }
            else{
                return res.status(200).json();
            }
        });  

        request.on('row', function(columns: any[]) {
            columns.forEach(function(column: { value: any; }) {
              console.log(column.value);
            });
          });
        
          Connection.execSql(request);
        
    }    
    
}

export default CostumerController