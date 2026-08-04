
const CAPTCHA_API =
    "http://viberschat.space:2052/api/captcha";

let captchaId = null;


// ======================================
// GET CAPTCHA
// ======================================

async function loadCaptcha() {

    const message =
        document.getElementById("message");

    const captchaImage =
        document.getElementById("captchaImage");

    message.textContent =
        "Loading CAPTCHA...";

    try {

        const response =
            await fetch(CAPTCHA_API);

        if (!response.ok) {

            throw new Error(
                "HTTP error: " +
                response.status
            );
        }

        const data =
            await response.json();

        console.log("CAPTCHA response:", data);


        if (data.status !== "success") {

            throw new Error(
                "CAPTCHA request failed."
            );
        }


        // Save CAPTCHA ID
        captchaId =
            data.captcha_id;


        // Display CAPTCHA image
        captchaImage.src =
            data.captcha_url;


        message.textContent = "";

        console.log(
            "Captcha ID:",
            captchaId
        );

        console.log(
            "Captcha URL:",
            data.captcha_url
        );

    }

    catch (error) {

        console.error(
            "CAPTCHA error:",
            error
        );

        message.textContent =
            "Unable to load CAPTCHA.";

    }
}


// ======================================
// REFRESH CAPTCHA
// ======================================

document
    .getElementById("refreshCaptcha")
    .addEventListener(
        "click",
        loadCaptcha
    );


// ======================================
// REGISTER
// ======================================

document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const captchaCode =
                document
                    .getElementById("captchaCode")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message");


            if (!captchaId) {

                message.textContent =
                    "Please wait for CAPTCHA.";

                return;
            }


            if (!captchaCode) {

                message.textContent =
                    "Please enter the CAPTCHA.";

                return;
            }


            const registerData = {

                username: username,

                password: password,

                version: "1.8.5",

                imei:
                    "1188d7271ef144a2ae72e9d9c51111c8",

                captcha_id:
                    captchaId,

                captcha_code:
                    captchaCode

            };


            console.log(
                "Registration data:",
                registerData
            );


            message.textContent =
                "Registering...";


            try {

                const response =
                    await fetch(
                        "http://viberschat.space:2052/api/register",
                        {
                            method: "POST",

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


                console.log(
                    "Registration response:",
                    result
                );


                message.textContent =
                    result;

            }

            catch (error) {

                console.error(
                    "Registration error:",
                    error
                );

                message.textContent =
                    "Registration request failed.";
            }

        }
    );


// ======================================
// LOAD CAPTCHA WHEN PAGE OPENS
// ======================================

loadCaptcha();
