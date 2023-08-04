const axios = require('axios');
const { JSDOM } = require('jsdom');
const {qs} = require('qs');
const fs = require('fs');

const runScript = async() => {
    try {
        const fetchtokenoptions = {
          url: `http://127.0.0.1:3333/command/core/get-csrf-token`,
          method: 'GET',
        };
        // console.log(fetchtokenoptions,'fetchtokenoptions');
        const fetchtokenresponse = await axios(fetchtokenoptions);
        // console.log(fetchtokenresponse.data,'response');
        const createProjectOptions = {
            url: `http://127.0.0.1:3333/command/core/create-project-from-upload?csrf_token=${fetchtokenresponse.data.token}`,
            method: 'POST',
          };
        // console.log(createProjectOptions,'createProjectOptions');
        const createProjectResponse = await axios(createProjectOptions);
        // console.log(createProjectResponse,'createProjectResponse');    
        const fetchtokenresponse2 = await axios(fetchtokenoptions);
        const applyOperationsOptions = {
            url: `http://127.0.0.1:3333/command/core/apply-operations?project=1811607108481&csrf_token=${fetchtokenresponse2.data.token}&operations=[
                {
                  "op": "core/column-addition",
                  "engineConfig": {
                    "facets": [],
                    "mode": "row-based"
                  },
                  "baseColumnName": "id",
                  "expression": "grel:value",
                  "onError": "set-to-blank",
                  "newColumnName": "abcdef",
                  "columnInsertIndex": 4,
                  "description": "Create column abc at index 4 based on column id using expression grel:value"
                }
              ]`,
            method: 'POST',
          };
        // console.log(applyOperationsOptions,'applyOperationsOptions');
        const applyOperationsResponse = await axios(applyOperationsOptions);
        // console.log(applyOperationsResponse.data,'applyOperationsResponse');    
        
        
        const exportDataOptions = {
            url: `http://127.0.0.1:3333/command/core/export-rows/abcd.csv`,
            method: 'POST',
            headers:   JSON.parse(JSON.stringify({ 
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8', 
                'Cache-Control': 'max-age=0', 
                'Connection': 'keep-alive', 
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Cookie': 'host=.butterfly; host=.butterfly', 
                'Origin': 'http://127.0.0.1:3333', 
                'Referer': 'http://127.0.0.1:3333/project?project=2138472716692', 
                'Sec-Fetch-Dest': 'document', 
                'Sec-Fetch-Mode': 'navigate', 
                'Sec-Fetch-Site': 'same-origin', 
                'Sec-Fetch-User': '?1', 
                'Upgrade-Insecure-Requests': '1', 
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36', 
                'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-platform': '"macOS"'
            })),
            maxBodyLength: Infinity,
            data: JSON.parse(JSON.stringify({
                'project': '1811607108481',
                'format': 'csv',
                'quoteAll': '',
                'engine': '{"facets":[],"mode":"row-based"}' 
              }))
        };
        //   console.log(exportDataOptions,'exportDataOptions');
          const exportDataResponse = await axios(exportDataOptions);
          console.log(exportDataResponse.data);
          fs.writeFile("./output.csv",exportDataResponse.data, err=> {
            if(!err){
                console.log('File written successfully');
            }
            else{
                console.log('error occured')
            }
          })
      } catch (error) {
        console.log('error');
      }
}

runScript();
