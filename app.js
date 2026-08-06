// ==========================================
// CAPTCHA SETTINGS
// ==========================================

const CAPTCHA_API =
    "https://viberschat.space:2053/api/captcha";


// ==========================================
// GET PAGE ELEMENTS
// ==========================================

const refreshCaptcha =
    document.getElementById(
        "refreshCaptcha"
    );


const showCaptcha =
    document.getElementById(
        "showCaptcha"
    );


const captchaUrl =
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

refreshCaptcha.addEventListener(
    "click",
    function() {

        status.textContent =
            "Opening CAPTCHA API...";


        /*
         * At the moment the server does not
         * allow GitHub JavaScript fetch().
         *
         * Therefore we open the API directly.
         */

        window.open(
            CAPTCHA_API,
            "_blank"
        );


        status.textContent =
            "CAPTCHA API opened.\n\n" +
            "Copy the captcha_url from the " +
            "new page and paste it into " +
            "the CAPTCHA URL box.";

    }
);


// ==========================================
// SHOW CAPTCHA
// ==========================================

showCaptcha.addEventListener(
    "click",
    function() {


        const url =
            captchaUrl.value.trim();


        if (!url) {

            status.textContent =
                "Please enter a CAPTCHA URL.";

            return;

        }


        status.textContent =
            "Loading CAPTCHA image...";


        captchaImage.onload =
            function() {

                status.textContent =
                    "CAPTCHA image loaded successfully.";

            };


        captchaImage.onerror =
            function() {

                status.textContent =
                    "Unable to load CAPTCHA image.\n\n" +
                    "The URL may be expired or " +
                    "the image server may reject " +
                    "browser image requests.";

            };


        captchaImage.src =
            url;

    }
);
