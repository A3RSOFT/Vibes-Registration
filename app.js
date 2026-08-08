const API =
    "http://viberschat.space:2052/api/captcha";


const refreshButton =
    document.getElementById("refreshCaptcha");

const showButton =
    document.getElementById("showCaptcha");

const captchaUrlBox =
    document.getElementById("captchaUrl");

const captchaImage =
    document.getElementById("captchaImage");

const status =
    document.getElementById("status");


// ==========================================
// GET FRESH CAPTCHA
// ==========================================

refreshButton.addEventListener(
    "click",
    async function () {

        status.textContent =
            "Getting fresh CAPTCHA...";

        captchaUrlBox.value = "";

        captchaImage.removeAttribute("src");


        try {

            const response =
                await fetch(
                    API,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "HTTP status: " +
                    response.status
                );

            }


            const data =
                await response.json();


            console.log(
                "CAPTCHA API response:",
                data
            );


            if (
                data.status !== "success"
            ) {

                throw new Error(
                    "CAPTCHA API did not return success."
                );

            }


            if (
                !data.captcha_id ||
                !data.captcha_url
            ) {

                throw new Error(
                    "captcha_id or captcha_url is missing."
                );

            }


            // Put the returned URL
            // into the textbox.

            captchaUrlBox.value =
                data.captcha_url;


            status.textContent =
                "CAPTCHA URL received.\n\n" +
                "CAPTCHA ID:\n" +
                data.captcha_id;


            console.log(
                "CAPTCHA ID:",
                data.captcha_id
            );


            console.log(
                "CAPTCHA URL:",
                data.captcha_url
            );

        }


        catch (error) {

            console.error(
                "CAPTCHA API ERROR:",
                error
            );


            status.textContent =
                "FAILED TO GET CAPTCHA\n\n" +
                error.name +
                "\n\n" +
                error.message;

        }

    }
);


// ==========================================
// SHOW CAPTCHA IMAGE
// ==========================================

showButton.addEventListener(
    "click",
    function () {

        const url =
            captchaUrlBox.value.trim();


        if (!url) {

            status.textContent =
                "ERROR:\n\n" +
                "Please paste a CAPTCHA URL first.";

            return;

        }


        status.textContent =
            "Loading CAPTCHA image...";


        captchaImage.onload =
            function () {

                status.textContent =
                    "SUCCESS!\n\n" +
                    "CAPTCHA image loaded.";

            };


        captchaImage.onerror =
            function () {

                status.textContent =
                    "IMAGE FAILED\n\n" +
                    "The browser could not display " +
                    "the CAPTCHA image.";

                console.error(
                    "CAPTCHA image failed:",
                    url
                );

            };


        // Display the image.

        captchaImage.src =
            url;

    }
);
