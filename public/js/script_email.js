$(document).ready(function () {
    // Processing triggered by the click of the submit button on the form
    // https://www.emailjs.com/
    $("#btnSubmit").click(function (event) {
        // Cancel submit
        event.preventDefault();
        // Get form data
        let name = $("#inputName").val();
        let email = $("#inputMail").val();
        let subject = $("#inputObject").val();
        let message = $("#inputMessage").val();

        // Set the options that I want
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        // Checks that all inputs are completed
        if (name != "" && email != "" && subject != "" && message != "") {
            // Function send email
            emailjs.send("service_fch1t7g", "template_f7lnxw1", {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            }).then(function () {
                // Send a notification    
                Toast.fire({
                    icon: 'success',
                    title: 'Your message has successfully been sent.',
                    showConfirmButton: false,
                    timer: 3000
                }),                
                // Remove was-validated class to the form (bootstrap validation)
                $("#contactForm").removeClass("was-validated");
                // Empty all the fields of the form
                $("#contactForm").trigger("reset");
            }, function (error) {
                // Send a notification  
                Toast.fire({
                    icon: 'error',
                    title: "Your message has not been sent.<br/>Error: " + error,
                    showConfirmButton: false,
                    timer: 3000
                }),                
                // Remove was-validated class to the form (bootstrap validation)
                $("#contactForm").removeClass("was-validated");
                // Empty all the fields of the form
                $("#contactForm").trigger("reset");
            });
        } else {
            // Send a notification    
            Toast.fire({
                    icon: 'error',
                    title: 'Please fill all the fields.',
                    showConfirmButton: false,
                    timer: 3000
                }),
                // Add was-validated class to the form (bootstrap validation)
                $("#contactForm").addClass("was-validated");
        };
    });

});