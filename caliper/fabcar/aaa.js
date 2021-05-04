/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

const colors = ['blue', 'red', 'green', 'yellow', 'black', 'purple', 'white', 'violet', 'indigo', 'brown'];
const makes = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
const models = ['Prius', 'Mustang', 'Tucson', 'Passat', 'S', '205', 'S22L', 'Punto', 'Nano', 'Barina'];
const owners = ['Tomoko', 'Brad', 'Jin Soo', 'Max', 'Adrianna', 'Michel', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];

/**
 * Workload module for the benchmark round.
 */
class CreateCarWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
    */
     async submitTransaction() {
        this.txIndex++;
        let carNumber
        carNumber = 'Client' + this.workerIndex + '_CAR'+ this.txIndex.toString();
        var s=carNumber.slice(-1)
/*
//######### 20% MVCC Conflict         
        if(s == 2 || s==3 ) {
            carNumber =  'Client' + this.workerIndex+ '_CAR1';
        }
        else {
            carNumber = 'Client' + this.workerIndex + '_CAR'+ this.txIndex.toString();           
        }
*/
/*
//######### 40% MVCC Conflict         
        if(s == 2 || s==3 || s == 4 || s==5) {
            carNumber =  'Client' + this.workerIndex+ '_CAR1';
        }
        else {
            carNumber = 'Client' + this.workerIndex + '_CAR'+ this.txIndex.toString();           
        }
*/
/*
//######### 60% MVCC Conflict         
        if(s == 2 || s==3 || s == 4 || s==5){
            carNumber = 'Client' + this.workerIndex + '_CAR'+ this.txIndex.toString();
        }
        else {
            carNumber =  'Client' + this.workerIndex+ '_CAR1'; 
        }
*/
/* 
//######### 80% MVCC Conflict         
        if(s == 2 || s==3 ) {
            carNumber = 'Client' + this.workerIndex + '_CAR'+ this.txIndex.toString();
        }
        else {
            carNumber =  'Client' + this.workerIndex+ '_CAR1'; 
        }
*/  

//######### 100% MVCC Conflict 
//carNumber =  'Client' + this.workerIndex+ '_CAR1'; 
/*
//######### 50% MVCC Conflict         
        if(s == 2 || s==3 || s == 4 || s==5 ||s == 6  ) {
            carNumber = 'Client' + this.workerIndex + '_CAR'+ this.txIndex.toString();
        }
        else {
            carNumber =  'Client' + this.workerIndex+ '_CAR1'; 
        }
*/

        let newCarOwner = owners[Math.floor(Math.random() * owners.length)];

        let args = {
            contractId: 'fabcar',
            contractVersion: 'v1',
            contractFunction: 'changeCarOwner',
            contractArguments: [carNumber, newCarOwner],
            timeout: 60
        };

        if (this.txIndex === this.roundArguments.assets) {
            this.txIndex = 0;
        }

        const response = await this.sutAdapter.sendRequests(args)
        /*.then(function(data) {
         var res=JSON.parse(JSON.stringify(data))
          console.log ("122222222222222222222222222222");
        console.log (res.status.error_messages);
      })
      .catch(function(error) {
        console.log ("111111111111111111111111111111111111111111111111111111"+error);
    });
       //console.log(res)*/
    }

}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new CreateCarWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
