import {SlackToken} from "../config/config";
import fs = require('fs');

//Could be in config
var filePath = 'aliases';

export class Alias{
    aliases;
    file;

    public addAlias(param, res){
        this.loadAliases(res);
        //Get alias name and the rest
        if(this.aliasExists(param['aliasName'])){
            this.ephemeralResponse(res, 'Error', 'Alias already in use with ' + this.aliases[param['aliasName']]);
        }

        //Put alias in file and save
        this.aliases[param['aliasName']] = {
            zip: param['zip'],
            country: param['country'],
            forecast: param['forecast']
        };
        this.saveAliases(res);

        //Send confirmation message
        this.ephemeralResponse(res, 'Success', 'Alias ' + param['aliasName'] + ' saved with ' + param['zip'] + ' ' + param['country'] + ' ' + param['forecast']);
    }
    
    public deleteAlias(param, res){
        this.loadAliases(res);
        if(this.aliasExists(param['aliasName'])){
            delete this.aliases[param['aliasName']];
            this.saveAliases(res);
            this.ephemeralResponse(res, 'Success', 'Alias ' + param['aliasName'] + ' deleted');
        } else{
            this.ephemeralResponse(res, 'Error', 'Alias ' + param['aliasName'] + ' does not exists');
        }
    }
    
    public getRequestFromAlias(param, res){
        //TODO
    }
    
    private loadAliases(res){
        this.file = fs.open(filePath, 'w+', (err, fd) => {
            if(err){
                this.ephemeralResponse(res, 'Error', 'Was unable to open file');
            }
        });
        
        fs.readFile(this.file, (err, data) => {
            if(err){
                this.ephemeralResponse(res, 'Error', 'Was unable to load alias file');
            } else{
                this.aliases = JSON.parse(data.toString());
            }
        }); 
    }
        
    private saveAliases(res){
        fs.writeFile(this.file, JSON.stringify(this.aliases), (err) =>{
            if(err) {
                this.ephemeralResponse(res, 'Error', 'Was unable to save alias file');
            }
        });
        
        fs.close(this.file, (err) => {
            this.ephemeralResponse(res, 'Error', 'Was unable to close alias file');
        });
    }
    
    private aliasExists(aliasName){
        return aliasName in this.aliases;
    }
    
    private ephemeralResponse(res, m_pretext, m_text){
        res.status(200).send({
            response_type: 'ephemeral',
            attachment: [{  
                pretext: m_pretext,
                text: m_text
            }]
        });
    }
}