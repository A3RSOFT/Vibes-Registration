const API =
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


refreshButton.addEventListener(
    "click",
    async function() {

        status.textContent =
            "STEP 1: Starting request...";


        try {

            status.textContent =
                "STEP 2: Calling:\n" +
                API;


            const response =
                await fetch(
                    API,
                    {
                        method: "GET",
                        mode: "cors",
                        cache: "no-store"
                    }
                );


            status.textContent =
                "STEP 3: Server responded.\n" +
                "HTTP status: " +
                response.status;


            const text =
                await response.text();


            console.log(
                "SERVER RESPONSE:",
                text
            );


            status.textContent =
                "STEP 4: Response received:\n\n" +
                text;


            try {

                const data =
                    JSON.parse(text);


                if (
                    data.captcha_url
                ) {

                    captchaUrlBox.value =
                        data.captcha_url;


                    status.textContent +=
                        "\n\nCAPTCHA URL extracted successfully.";

                }

            }

            catch (jsonError) {

                status.textContent +=
                    "\n\nResponse was not JSON.";

            }

        }

        catch (error) {

            console.error(
                "FETCH ERROR:",
                error
            );


            status.textContent =
                "REQUEST FAILED\n\n" +
                error.name +
                "\n\n" +
                error.message +
                "\n\n" +
                "The browser could not read " +
                "the CAPTCHA API response.";

        }

    }
);


showButton.addEventListener(
    "click",
    function() {

        const captchaUrl =
            captchaUrlBox.value.trim();

        if (!captchaUrl) {

            status.textContent =
                "ERROR: No CAPTCHA URL provided.\n\n" +
                "Click REFRESH CAPTCHA first or paste a URL.";

            return;

        }

        status.textContent =
            "Loading CAPTCHA image...";

        captchaImage.onload = function() {

            status.textContent =
                "SUCCESS: CAPTCHA image loaded!";

        };

        captchaImage.onerror = function() {

            status.textContent =
                "FAILED: Could not load CAPTCHA image.\n\n" +
                "URL: " + captchaUrl + "\n\n" +
                "The image may be blocked by CORS policy " +
                "or the URL may be invalid.";

            console.error(
                "Image load error for URL:",
                captchaUrl
            );

        };

        captchaImage.src = captchaUrl;

    }
);
