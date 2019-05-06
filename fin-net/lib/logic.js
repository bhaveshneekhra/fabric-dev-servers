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

// 'use strict';

// import { access } from "fs";

/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {finnet.ApproveRequest} approveRequest
 * @transaction
 */
function approveRequest(approveRequest) {
    if(approveRequest.from.balance < approveRequest.to.balance){
        throw new Error("Insufficient funds");
    }
    if(approveRequest.from.balance >10000){
        throw new Error("Need additional approval from HoD/Dean");
    }
    approveRequest.from.balance -= approveRequest.amount;
    approveRequest.to.balance += approveRequest.amount;

    return getAssetRegistry('finnet.Account')
    .then (function (assetRegistry){
        return assetRegistry.update(approveRequest.from);
    })
    .then (function() {
        return getAssetRegistry('finnet.Account');
    })
    .then (function(assetRegistry) {
        return assetRegistry.update(approveRequest.to);
    });
}
//     // Save the old value of the asset.
//     const oldValue = tx.asset.value;

//     // Update the asset with the new value.
//     tx.asset.value = tx.newValue;

//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('finnet.SampleAsset');
//     // Update the asset in the asset registry.
//     await assetRegistry.update(tx.asset);

//     // Emit an event for the modified asset.
//     let event = getFactory().newEvent('finnet', 'SampleEvent');
//     event.asset = tx.asset;
//     event.oldValue = oldValue;
//     event.newValue = tx.newValue;
//     emit(event);
// }
