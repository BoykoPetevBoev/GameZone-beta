/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

'use strict';

const applicationServerPublicKey = 'BKTY4jTJ_YSMRf4miX6GE74Z1Jg_ANPdowdcsric6mj8Wa6R2F77Sh_xWcGuA5k5iLlA-oOwk9I9clBlgsZn8-U';
let isSubscribed = false;
let swRegistration = null;

function main() {
    const pushButton = document.getElementById('subscribe');
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        // console.log('Service Worker and Push is supported');

        navigator.serviceWorker.register('sw.js')
            .then(function (swReg) {
                // console.log('Service Worker is registered', swReg);

                swRegistration = swReg;
                initializeUI(pushButton);
            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
    } else {
        console.warn('Push messaging is not supported');
        pushButton.textContent = 'Push Not Supported';
    }
}
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function initializeUI(pushButton) {
    pushButton.addEventListener('click', function () {
        pushButton.disabled = true;
        if (isSubscribed) {
            // TODO: Unsubscribe user
        } else {
            subscribeUser(pushButton);
        }
    });
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                // console.log('User IS subscribed.');
            } else {
                // console.log('User is NOT subscribed.');
            }

            updateBtn(pushButton);
        });
}
function updateBtn(pushButton) {
    if (Notification.permission === 'denied') {
        pushButton.textContent = 'BLOCKED';
        pushButton.disabled = true;
        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        pushButton.textContent = 'ALLOWED';
    } else {
        pushButton.textContent = 'SUBSCRIBE';
    }

    pushButton.disabled = false;
}
function subscribeUser(pushButton) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('User is subscribed.');
            updateSubscriptionOnServer(subscription);
            isSubscribed = true;
            updateBtn(pushButton);
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            updateBtn(pushButton);
        });
}
function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    // const subscriptionJson = document.querySelector('.js-subscription-json');
    // const subscriptionDetails =
    //     document.querySelector('.js-subscription-details');

    // if (subscription) {
    //     subscriptionJson.textContent = JSON.stringify(subscription);
    //     subscriptionDetails.classList.remove('is-invisible');
    // } else {
    //     subscriptionDetails.classList.add('is-invisible');
    // }
}
function showPushNotification(options) {
    const title = 'GameZone';
    navigator
        .serviceWorker
        .ready
        .then((sw) => {
            sw.showNotification(title, options);
        });
}

window.showPushNotification = showPushNotification
window.main = main;

export { showPushNotification }

