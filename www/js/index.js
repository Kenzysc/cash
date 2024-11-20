/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.RECORD_AUDIO, function (status) {
        if (status.hasPermission) {
            console.log("Audio permission granted.");
        } else {
            console.error("Audio permission denied.");
        }
    });

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    const startMicButton = document.getElementById('start-mic');
    const audioOutput = document.getElementById('audio-output');

    // Function to access the microphone
    async function startMicrophone() {
        try {
            // Request microphone access directly
            // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Play audio through the audio element
            audioOutput.srcObject = stream;
            audioOutput.play();

            console.log('Microphone started successfully!');
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access the microphone. Please grant permissions.');
        }
    }

    // Event listener for the button
    startMicButton.addEventListener('click', startMicrophone);
}

