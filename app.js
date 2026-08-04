const CAPTCHA_API =
    "http://viberschat.space:2052/api/captcha";

let captchaId = null;


// ======================================
// LOAD CAPTCHA
// ======================================

async function loadCaptcha() {

    const image =
        document.getElementById("captchaImage");

    const message =
        document.getElementById("message");


    message.textContent =
        "Connecting to CAPTCHA server...";


    image.removeAttribute("src");


    try {

        console.log(
            "Requesting:",
            CAPTCHA_API
        );


        const response =
            await fetch(
                CAPTCHA_API,
                {
                    method: "GET",

                    cache: "no-store"
                }
            );


        console.log(
            "HTTP status:",
            response.status
        );


        console.log(
            "Final URL:",
            response.url
        );


        const text =
            await response.text();


        console.log(
            "Server response:",
            text
        );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                ": " +
                text
            );

        }


        const data =
            JSON.parse(text);


        if (
            data.status !==
            "success"
        ) {

            throw new Error(
                "API returned: " +
                text
            );

        }


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


        /*
         * Try to display the image returned
         * by the API.
         */

        image.src =
            data.captcha_url;


        message.textContent =
            "CAPTCHA loaded.";


    }
    catch (error) {

        console.error(
            "CAPTCHA ERROR:",
            error
        );


        message.innerHTML =
            "<b>CAPTCHA failed.</b><br><br>" +
            error.message +
            "<br><br>" +
            "Open browser Developer Console " +
            "for the complete error.";

    }

}


// ======================================
// REFRESH
// ======================================

document
    .getElementById("refreshCaptcha")
    .addEventListener(
        "click",
        loadCaptcha
    );


// ======================================
// START
// ======================================

loadCaptcha();
