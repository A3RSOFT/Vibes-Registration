// ==========================================
// VIBER'S CHAT REGISTRATION
// ==========================================


// API endpoints

const CAPTCHA_API =
    "hhttps://viberschat.space:2053/api/captcha";


const REGISTER_API =
    "http://viberschat.space:2052/api/register";


// CAPTCHA ID returned by the server

let captchaId = null;


// ==========================================
// ELEMENTS
// ==========================================

const usernameInput =
    document.getElementById(
        "username"
    );


const passwordInput =
    document.getElementById(
        "password"
    );


const captchaImage =
    document.getElementById(
        "captchaImage"
    );


const captchaCodeInput =
    document.getElementById(
        "captchaCode"
    );


const refreshCaptchaButton =
    document.getElementById(
        "refreshCaptcha"
    );


const registerButton =
    document.getElementById(
        "registerButton"
    );


const statusBox =
    document.getElementById(
        "status"
    );


// ==========================================
// STATUS FUNCTION
// ==========================================

function showStatus(message) {

    statusBox.textContent =
        message;

}


// ==========================================
// GET CAPTCHA
// ======================================

async function loadCaptcha() {

    const message =
        document.getElementById("message");

    const captchaImage =
        document.getElementById("captchaImage");


    // Reset

    captchaId = null;

    captchaImage.removeAttribute("src");

    message.textContent =
        "Getting CAPTCHA...";


    try {

        console.log(
            "STEP 1: Requesting CAPTCHA"
        );


        const response =
            await fetch(
                "https://viberschat.space:2053/api/captcha",
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        console.log(
            "HTTP:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        // Read JSON

        const data =
            await response.json();


        console.log(
            "STEP 2: CAPTCHA response"
        );

        console.log(data);


        if (
            data.status !==
            "success"
        ) {

            throw new Error(
                "CAPTCHA API returned failure."
            );

        }


        // ==================================
        // STEP 3
        // SAVE CAPTCHA ID
        // ==================================

        captchaId =
            data.captcha_id;


        console.log(
            "CAPTCHA ID:",
            captchaId
        );


        // ==================================
        // STEP 4
        // CREATE WORKING IMAGE URL
        // ==================================

        const imageUrl =
            "https://www.viberschat.space:8443" +
            "/api/captcha/images/" +
            captchaId +
            ".png";


        console.log(
            "CAPTCHA IMAGE URL:"
        );

        console.log(
            imageUrl
        );


        // ==================================
        // STEP 5
        // DISPLAY IMAGE
        // ==================================

        captchaImage.onload =
            function() {

                console.log(
                    "STEP 6: CAPTCHA image loaded"
                );


                message.textContent =
                    "Enter the CAPTCHA.";

            };


        captchaImage.onerror =
            function() {

                console.error(
                    "STEP 6 FAILED:"
                );

                console.error(
                    imageUrl
                );


                message.textContent =
                    "CAPTCHA image failed to load.";

            };


        captchaImage.src =
            imageUrl;


    }

    catch (error) {

        console.error(
            "CAPTCHA ERROR:"
        );

        console.error(error);


        message.textContent =
            "CAPTCHA error: " +
            error.message;

    }

}
    

        // ==================================
        // SAVE CAPTCHA ID
        // ==================================

        captchaId =
            data.captcha_id;


        console.log(
            "CAPTCHA ID:",
            captchaId
        );


        console.log(
            "CAPTCHA URL:",
            data.captcha_url
        );


        // ==================================
        // DISPLAY CAPTCHA
        // ==================================

        captchaImage.src =
            data.captcha_url;


        captchaImage.onload =
            function() {

                showStatus(
                    "CAPTCHA loaded. " +
                    "Enter the characters shown above."
                );

            };


        captchaImage.onerror =
            function() {

                showStatus(
                    "CAPTCHA ID received, " +
                    "but the CAPTCHA image " +
                    "could not be loaded."
                );

            };


    }


    catch (error) {

        console.error(
            "CAPTCHA ERROR:",
            error
        );


        showStatus(
            "CAPTCHA ERROR:\n\n" +
            error.message
        );

    }

}


// ==========================================
// REGISTER
// ==========================================

async function registerAccount() {


    // ======================================
    // GET FORM VALUES
    // ======================================

    const username =
        usernameInput
            .value
            .trim();


    const password =
        passwordInput
            .value;


    const captchaCode =
        captchaCodeInput
            .value
            .trim();


    // ======================================
    // VALIDATION
    // ======================================

    if (!username) {

        showStatus(
            "Please enter a username."
        );

        usernameInput.focus();

        return;
    }


    if (!password) {

        showStatus(
            "Please enter a password."
        );

        passwordInput.focus();

        return;
    }


    if (!captchaId) {

        showStatus(
            "Please load a CAPTCHA first."
        );

        return;
    }


    if (!captchaCode) {

        showStatus(
            "Please enter the CAPTCHA code."
        );

        captchaCodeInput.focus();

        return;
    }


    // ======================================
    // CREATE SAME DATA AS PYTHON
    // ======================================

    const registerData = {

        username:
            username,

        password:
            password,

        version:
            "1.8.5",

        imei:
            "1188d7271ef144a2ae72e9d9c51111c8",

        captcha_id:
            captchaId,

        captcha_code:
            captchaCode

    };


    console.log(
        "Registration request:"
    );


    console.log(
        registerData
    );


    showStatus(
        "Registering..."
    );


    registerButton.disabled =
        true;


    try {


        // ==================================
        // POST /api/register
        // ==================================

        const response =
            await fetch(
                REGISTER_API,
                {

                    method:
                        "POST",

                    headers:
                        {
                            "Content-Type":
                                "application/json"
                        },

                    body:
                        JSON.stringify(
                            registerData
                        )

                }
            );


        console.log(
            "REGISTER HTTP status:",
            response.status
        );


        const result =
            await response.text();


        console.log(
            "REGISTER response:",
            result
        );


        // ==================================
        // SHOW SERVER RESPONSE
        // ==================================

        showStatus(
            "HTTP " +
            response.status +
            "\n\n" +
            result
        );


        // ==================================
        // CAPTCHA MAY BE SINGLE USE
        // ==================================

        if (
            response.status >= 400
        ) {

            console.log(
                "Registration failed. " +
                "A new CAPTCHA may be required."
            );

        }


    }


    catch (error) {

        console.error(
            "REGISTRATION ERROR:",
            error
        );


        showStatus(
            "REGISTRATION ERROR:\n\n" +
            error.message
        );

    }


    finally {

        registerButton.disabled =
            false;

    }

}


// ==========================================
// BUTTON EVENTS
// ==========================================

refreshCaptchaButton
    .addEventListener(
        "click",
        loadCaptcha
    );


registerButton
    .addEventListener(
        "click",
        registerAccount
    );


// ==========================================
// LOAD CAPTCHA ON PAGE START
// ==========================================

loadCaptcha();

