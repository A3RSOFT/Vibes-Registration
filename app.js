const API =
    "http://viberschat.space:2052/api/captcha";


const refreshButton =
    document.getElementById(
        "refreshCaptcha"
    );


const captchaUrlBox =
    document.getElementById(
        "captchaUrl"
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
