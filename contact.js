
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formEndpoint = contactForm.action;

        // Prevent accidental submission before Formspree is connected.
        if (formEndpoint.includes("YOUR_FORM_ID")) {
            formStatus.textContent =
                "The form is ready, but email delivery has not been connected yet.";
            return;
        }

        const submitButton = contactForm.querySelector(
            ".contact-form__submit"
        );

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending Inquiry...";

        formStatus.textContent = "";

        try {

            const response = await fetch(formEndpoint, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {

                contactForm.reset();

                formStatus.textContent =
                    "Thank you! Your inquiry has been submitted successfully.";

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again or email us directly.";

            }

        } catch (error) {

            formStatus.textContent =
                "Unable to submit your inquiry. Please check your connection or email us directly.";

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML =
                'Send Project Inquiry <span>→</span>';

        }

    });

}
