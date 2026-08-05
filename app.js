// ==========================================
// CAPTCHA API TEST
// ==========================================


// API endpoint

const CAPTCHA_API =
    "https://viberschat.space:2053/api/captcha";


// Elements

const getCaptchaButton =
    document.getElementById(
        "getCaptcha"
    );


const responseBox =
    document.getElementById(
        "responseBox"
    );


const statusBox =
    document.getElementById(
        "status"
    );


// ==========================================
// GET CAPTCHA API RESPONSE
// ==========================================

async function getCaptcha() {


    responseBox.value = "";


    statusBox.textContent =
        "Connecting to CAPTCHA API...";


    console.log(
        "Requesting:",
        CAPTCHA_API
    );


    try {


        // ==================================
        // SEND GET REQUEST
        // ==================================

        const response =
            await fetch(
                CAPTCHA_API,
                {
                    method:
                        "GET",

                    cache:
                        "no-store"
                }
            );


        console.log(
            "HTTP status:",
            response.status
        );


        console.log(
            "Response URL:",
            response.url
        );


        // ==================================
        // GET RAW RESPONSE
        // ==================================

        const text =
            await response.text();


        console.log(
            "Raw response:",
            text
        );


        // ==================================
        // SHOW COMPLETE RESPONSE
        // ==================================

        responseBox.value =
            text;


        statusBox.textContent =
            "SUCCESS\n\n" +
            "HTTP Status: " +
            response.status;


    }


    catch (error) {


        console.error(
            "FETCH ERROR:",
            error
        );


        responseBox.value =
            "REQUEST FAILED\n\n" +
            error.toString();


        statusBox.textContent =
            "FAILED TO FETCH\n\n" +
            error.message +
            "\n\n" +
            "The browser could not read the API response.";

    }

}


// ==========================================
// BUTTON
// ==========================================

getCaptchaButton
    .addEventListener(
        "click",
        getCaptcha
    );
