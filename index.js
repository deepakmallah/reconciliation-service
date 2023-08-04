const axios = require('axios');
const { JSDOM } = require('jsdom');
const {qs} = require('qs');

const runScript = async() => {
    try {
        const fetchtokenoptions = {
          url: `http://127.0.0.1:3333/command/core/get-csrf-token`,
          method: 'GET',
        };
        console.log(fetchtokenoptions,'fetchtokenoptions');
        const fetchtokenresponse = await axios(fetchtokenoptions);
        console.log(fetchtokenresponse.data,'response');
        const createProjectOptions = {
            url: `http://127.0.0.1:3333/command/core/create-project-from-upload?csrf_token=${fetchtokenresponse.data.token}`,
            method: 'POST',
          };
        console.log(createProjectOptions,'createProjectOptions');
        const createProjectResponse = await axios(createProjectOptions);
        console.log(createProjectResponse,'createProjectResponse');    
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
        console.log(applyOperationsOptions,'applyOperationsOptions');
        const applyOperationsResponse = await axios(applyOperationsOptions);
        console.log(applyOperationsResponse.data,'applyOperationsResponse');    
        
        
        const exportDataOptions = {
            url: `http://127.0.0.1:3333/command/core/export-rows/abcd.csv`,
            method: 'POST',
            data: qs.stringify({
                'project': '1811607108481',
                'format': 'csv',
                'engine': '{"facets":[],"mode":"row-based"}' 
            })
        };
          console.log(exportDataOptions,'exportDataOptions');
          const exportDataResponse = await axios(exportDataOptions);
          console.log(exportDataResponse);
      } catch (error) {
        console.log('error');
      }
}

runScript();
