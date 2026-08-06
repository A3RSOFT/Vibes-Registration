const CAPTCHA_API =
    "http://viberschat.space:2052/api/captcha";


const refreshButton =
    document.getElementById(
        "refreshCaptcha"
    );


const showButton =
    document.getElementById(
        "showCaptcha"
    );


const captchaUrlBox =
    document.getElementById(
        "captchaUrl"
    );


const captchaImage =
    document.getElementById(
        "captchaImage"
    );


const status =
    document.getElementById(
        "status"
    );


// ==========================================
// REFRESH CAPTCHA
// ==========================================

refreshButton.addEventListener(
    "click",
    async function() {

        status.textContent =
            "Requesting CAPTCHA...";


        captchaImage.removeAttribute(
            "src"
        );


        captchaUrlBox.value = "";


        try {

            const response =
                await fetch(
                    CAPTCHA_API,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );


            status.textContent =
                "HTTP Status: " +
                response.status;


            if (!response.ok) {

                throw new Error(
                    "HTTP error " +
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
                !data.captcha_id ||
                !data.captcha_url
            ) {

                throw new Error(
                    "CAPTCHA response does not " +
                    "contain captcha_id/captcha_url."
                );

            }


            // Put the exact server URL
            // into the textbox.

            captchaUrlBox.value =
                data.captcha_url;


            status.textContent =
                "CAPTCHA URL received.\n" +
                "CAPTCHA ID: " +
                data.captcha_id;


        }

        catch (error) {

            console.error(
                "CAPTCHA ERROR:",
                error
            );


            status.textContent =
                "CAPTCHA ERROR\n\n" +
                error.message;

        }

    }
);


// ==========================================
// SHOW CAPTCHA
// ==========================================

showButton.addEventListener(
    "click",
    function() {

        const url =
            captchaUrlBox.value.trim();


        if (!url) {

            status.textContent =
                "No CAPTCHA URL.";

            return;

        }


        status.textContent =
            "Loading CAPTCHA image...";


        captchaImage.onload =
            function() {

                status.textContent =
                    "SUCCESS!\n\n" +
                    "CAPTCHA image loaded.";

            };


        captchaImage.onerror =
            function() {

                status.textContent =
                    "IMAGE ERROR.\n\n" +
                    "The CAPTCHA URL was received, " +
                    "but the browser could not load " +
                    "the image.";

            };


        captchaImage.src =
            url;

    }
);
