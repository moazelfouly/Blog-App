const baseURL = 'http://localhost:3000'

$("#login").click(async () => {
    const email = $("#email").val();
    const password = $("#password").val();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    const data = { email, password };
    console.log({ data });

    try {
        const response = await axios({
            method: 'post',
            url: `${baseURL}/auth/login`,
            data: data,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });

        const { message, token } = response.data;

        if (message === "Login successful") {
            localStorage.setItem('token', token);
            console.log("Login success, token stored:", token);

            window.location.href = 'chat.html';
        } else {
            alert("Invalid email or password");
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("Invalid email or password");
    }
});
