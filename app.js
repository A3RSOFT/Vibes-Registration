
// ==========================================
// VIBER'S CHAT REGISTRATION
// ==========================================

const CAPTCHA_API =
    "https://viberschat.space:2053/api/captcha";

const REGISTER_API =
    "http://viberschat.space:2052/api/register";

let captchaId = null;


// ==========================================
// ELEMENTS
// ==========================================

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const captchaImage =
    document.getElementById("captchaImage");

const captchaCodeInput =
    document.getElementById("captchaCode");

const refreshCaptchaButton =
    document.getElementById("refreshCaptcha");

const registerButton =
    document.getElementById("registerButton");

const message =
    document.getElementById("message");


// ==========================================
// STATUS
// ==========================================

function status(text) {

    console.log(text);

    message.textContent = text;

}


// ==========================================
// GET CAPTCHA
// ==========================================

async function loadCaptcha() {

    captchaId = null;

    captchaImage.removeAttribute("src");

    captchaCodeInput.value = "";


    status(
        "STEP 1: Connecting to CAPTCHA API..."
    );


    try {

        console.log(
            "CAPTCHA API:",
            CAPTCHA_API
        );


        // ----------------------------------
        // STEP 1
        // ----------------------------------

        const response =
            await fetch(
                CAPTCHA_API,
                {
                    method: "GET",

                    cache: "no-store"
                }
            );


        status(
            "STEP 2: CAPTCHA server responded: HTTP " +
            response.status
        );


        console.log(
            "HTTP status:",
            response.status
        );


        console.log(
            "Final URL:",
            response.url
        );


        // ----------------------------------
        // STEP 2
        // ----------------------------------

        const text =
            await response.text();


        console.log(
            "Raw CAPTCHA response:",
            text
        );


        if (!response.ok) {

            status(
                "CAPTCHA HTTP ERROR:\n" +
                response.status +
                "\n\n" +
                text
            );

            return;
        }


        // ----------------------------------
        // STEP 3
        // ----------------------------------

        let data;


        try {

            data =
                JSON.parse(text);

        }

        catch (jsonError) {

            status(
                "SERVER DID NOT RETURN JSON:\n\n" +
                text
            );

            return;
        }


        console.log(
            "CAPTCHA JSON:",
            data
        );


        // ----------------------------------
        // STEP 4
        // ----------------------------------

        if (
            data.status !==
            "success"
        ) {

            status(
                "CAPTCHA API FAILED:\n\n" +
                JSON.stringify(
                    data,
                    null,
                    2
                )
            );

            return;
        }


        captchaId =
            data.captcha_id;


        console.log(
            "CAPTCHA ID:",
            captchaId
        );


        // ----------------------------------
        // STEP 5
        // ----------------------------------

        status(
            "STEP 3: CAPTCHA ID received.\n\n" +
            captchaId
        );


        // ----------------------------------
        // BUILD IMAGE URL
        // ----------------------------------

        const imageUrl =
            "https://www.viberschat.space:8443" +
            "/api/captcha/images/" +
            captchaId +
            ".png";


        console.log(
            "CAPTCHA IMAGE URL:",
            imageUrl
        );


        // ----------------------------------
        // STEP 6
        // ----------------------------------

        status(
            "STEP 4: Loading CAPTCHA image..."
        );


        captchaImage.onload =
            function() {

                console.log(
                    "CAPTCHA IMAGE LOADED!"
                );


                status(
                    "CAPTCHA loaded successfully.\n\n" +
                    "Enter the CAPTCHA code."
                );

            };


        captchaImage.onerror =
            function() {

                console.error(
                    "CAPTCHA IMAGE FAILED"
                );


                status(
                    "CAPTCHA ID received, " +
                    "but image failed to load.\n\n" +
                    imageUrl
                );

            };


        captchaImage.src =
            imageUrl;

    }


    catch (error) {

        console.error(
            "CAPTCHA FETCH ERROR:",
            error
        );


        status(
            "STEP 1 FAILED:\n\n" +
            "Failed to fetch.\n\n" +
            error.message +
            "\n\n" +
            "The browser could not read " +
            "the CAPTCHA API."
        );

    }

}


// ==========================================
// REFRESH CAPTCHA
// ==========================================

refreshCaptchaButton
    .addEventListener(
        "click",
        loadCaptcha
    );


// ==========================================
// REGISTER
// ==========================================

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


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


            if (!username) {

                status(
                    "Please enter username."
                );

                return;
            }


            if (!password) {

                status(
                    "Please enter password."
                );

                return;
            }


            if (!captchaId) {

                status(
                    "CAPTCHA has not loaded."
                );

                return;
            }


            if (!captchaCode) {

                status(
                    "Please enter CAPTCHA."
                );

                return;
            }


            // ----------------------------------
            // SAME DATA AS PYTHON
            // ----------------------------------

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
                "REGISTER DATA:",
                registerData
            );


            status(
                "Registering..."
            );


            try {

                const response =
                    await fetch(
                        REGISTER_API,
                        {

                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    registerData
                                )

                        }
                    );


                const result =
                    await response.text();


                status(
                    "HTTP " +
                    response.status +
                    "\n\n" +
                    result
                );


                console.log(
                    "REGISTER RESPONSE:",
                    result
                );

            }


            catch (error) {

                console.error(
                    "REGISTER ERROR:",
                    error
                );


                status(
                    "Registration failed:\n\n" +
                    error.message
                );

            }

        }
    );


// ==========================================
// START
// ==========================================

loadCaptcha();
```
      

