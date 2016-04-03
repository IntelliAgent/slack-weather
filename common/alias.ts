import fs = require('fs');

//Could be in config
var filePath = 'aliases';

export class Alias{
    aliases;

    public addAlias(param, res){
        try{
            this.loadAliases(res);
        }catch(err){
            this.ephemeralResponse(res, 'Error', 'Was unable to load aliases with error :' + err);
            return;
        }
        //Get alias name and the rest
        if(this.aliasExists(param['aliasName'])){
            this.ephemeralResponse(res, 'Error', 'Alias already in use with ' + this.aliases[param['aliasName']]);
        }else{
            //Put alias in file and save
            this.aliases[param['aliasName']] = {
                zip: param['zip'],
                country: param['country'],
                forecast: param['forecast']
            };
            
            try{
                this.saveAliases(res);
                //Send confirmation message
                this.ephemeralResponse(res, 'Success', 'Alias ' + param['aliasName'] + ' saved with ' + param['zip'] + ' ' + param['country'] + ' ' + param['forecast']);
            }catch(err){
                this.ephemeralResponse(res, 'Error', 'Was unable to save aliases with error :' + err);
                return;
            }
        }

    }
    
    public deleteAlias(param, res){
        this.loadAliases(res);
        if(this.aliasExists(param['aliasName'])){
            delete this.aliases[param['aliasName']];
            try{
                this.saveAliases(res);
                this.ephemeralResponse(res, 'Success', 'Alias ' + param['aliasName'] + ' deleted');
            }catch(err){
                this.ephemeralResponse(res, 'Error', 'Was unable to save aliases with error :' + err);
                return;
            }
        } else{
            this.ephemeralResponse(res, 'Error', 'Alias ' + param['aliasName'] + ' does not exists');
        }
    }
    
    public getRequestFromAlias(param, res){
        //TODO
    }
    
    private loadAliases(res){
        try{
            fs.accessSync(filePath, fs.F_OK);
        }catch(err){
            let fd = fs.openSync(filePath, 'w+');
            fs.closeSync(fd);
        }

        let data = fs.readFileSync(filePath, 'utf8');
        let stringifiedBuffer = data.toString();

        if(stringifiedBuffer === '' || 'undefined'){
            this.aliases = {};
        }else{
            this.aliases = JSON.parse(stringifiedBuffer);
        }
    }
        
    private saveAliases(res){
        fs.writeFileSync(filePath, JSON.stringify(this.aliases));
    }
    
    private aliasExists(aliasName){
        return aliasName in this.aliases;
    }
    
    private ephemeralResponse(res, m_pretext, m_text){
        res.status(200).send({
            response_type: 'ephemeral',
            attachments: [{  
                pretext: m_pretext,
                text: m_text
            }]
        });
    }
}