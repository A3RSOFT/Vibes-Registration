// ==========================================
// CAPTCHA IMAGE DISPLAY
// ==========================================


const captchaUrl =
    document.getElementById(
        "captchaUrl"
    );


const showCaptcha =
    document.getElementById(
        "showCaptcha"
    );


const captchaImage =
    document.getElementById(
        "captchaImage"
    );


const message =
    document.getElementById(
        "message"
    );


// ==========================================
// SHOW CAPTCHA BUTTON
// ==========================================

showCaptcha.addEventListener(
    "click",
    function() {


        const url =
            captchaUrl.value.trim();


        // Check URL

        if (!url) {

            message.textContent =
                "Please enter the CAPTCHA URL.";

            captchaImage.removeAttribute(
                "src"
            );

            return;

        }


        message.textContent =
            "Loading CAPTCHA...";


        // ==================================
        // IMAGE SUCCESS
        // ==================================

        captchaImage.onload =
            function() {

                message.textContent =
                    "CAPTCHA loaded successfully.";

            };


        // ==================================
        // IMAGE ERROR
        // ==================================

        captchaImage.onerror =
            function() {

                message.textContent =
                    "Unable to load CAPTCHA image.";

            };


        // ==================================
        // LOAD IMAGE
        // ==================================

        captchaImage.src =
            url;

    }
);
