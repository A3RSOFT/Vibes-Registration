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
