// ==========================================
// CAPTCHA TEST
// ==========================================


// CAPTCHA API

const CAPTCHA_API =
    "https://viberschat.space:2053/api/captcha";


// Elements

const captchaImage =
    document.getElementById(
        "captchaImage"
    );


const newCaptchaButton =
    document.getElementById(
        "newCaptcha"
    );


const statusBox =
    document.getElementById(
        "status"
    );


// ==========================================
// STATUS
// ==========================================

function showStatus(text) {

    console.log(text);

    statusBox.textContent = text;

}


// ==========================================
// GET CAPTCHA
// ==========================================

async function getCaptcha() {

    captchaImage.removeAttribute(
        "src"
    );


    showStatus(
        "STEP 1\n\n" +
        "Connecting to:\n" +
        CAPTCHA_API
    );


    try {


        // ==================================
        // STEP 1
        // ==================================

        const response =
            await fetch(
                CAPTCHA_API,
                {
                    method: "GET",

                    cache: "no-store"
                }
            );


        showStatus(
            "STEP 2\n\n" +
            "Server responded.\n\n" +
            "HTTP Status: " +
            response.status
        );


        // ==================================
        // STEP 2
        // ==================================

        const text =
            await response.text();


        console.log(
            "Server response:",
            text
        );


        // ==================================
        // STEP 3
        // ==================================

        let data;


        try {

            data =
                JSON.parse(text);

        }

        catch (error) {

            showStatus(
                "STEP 3 FAILED\n\n" +
                "Server did not return JSON:\n\n" +
                text
            );

            return;
        }


        // Show returned JSON

        console.log(
            "JSON:",
            data
        );


        // ==================================
        // STEP 4
        // ==================================

        if (
            data.status !==
            "success"
        ) {

            showStatus(
                "CAPTCHA API FAILED\n\n" +
                JSON.stringify(
                    data,
                    null,
                    2
                )
            );

            return;
        }


        // ==================================
        // GET CAPTCHA ID
        // ==================================

        const captchaId =
            data.captcha_id;


        if (!captchaId) {

            showStatus(
                "ERROR\n\n" +
                "No captcha_id was returned."
            );

            return;
        }


        // ==================================
        // STEP 5
        // ==================================

        const imageUrl =
            "https://www.viberschat.space:8443" +
            "/api/captcha/images/" +
            captchaId +
            ".png";


        console.log(
            "Image URL:",
            imageUrl
        );


        showStatus(
            "STEP 5\n\n" +
            "CAPTCHA ID:\n" +
            captchaId +
            "\n\n" +
            "Image URL:\n" +
            imageUrl +
            "\n\n" +
            "Loading image..."
        );


        // ==================================
        // STEP 6
        // ==================================

        captchaImage.onload =
            function() {

                showStatus(
                    "SUCCESS!\n\n" +
                    "CAPTCHA image loaded.\n\n" +
                    "CAPTCHA ID:\n" +
                    captchaId +
                    "\n\n" +
                    "Image URL:\n" +
                    imageUrl
                );

            };


        // ==================================
        // IMAGE ERROR
        // ==================================

        captchaImage.onerror =
            function() {

                showStatus(
                    "IMAGE FAILED\n\n" +
                    "The CAPTCHA API worked,\n" +
                    "but the image could not load.\n\n" +
                    imageUrl
                );

            };


        // ==================================
        // DISPLAY IMAGE
        // ==================================

        captchaImage.src =
            imageUrl;

    }


    catch (error) {


        console.error(
            "FETCH ERROR:",
            error
        );


        showStatus(
            "FETCH FAILED\n\n" +
            error.message +
            "\n\n" +
            "The browser could not read " +
            "the CAPTCHA API."
        );

    }

}


// ==========================================
// BUTTON
// ==========================================

newCaptchaButton
    .addEventListener(
        "click",
        getCaptcha
    );


// ==========================================
// AUTOMATICALLY GET CAPTCHA
// ==========================================

getCaptcha();
