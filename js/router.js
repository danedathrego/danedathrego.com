const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const routes = [
    { path: "/", view: "/pages/home.html" },
    { path: "/about", view: "/pages/about.html" },
    { path: "/contact", view: "/pages/contact.html" },
];

const matchRoute = () => {
    const current = location.pathname;
    return routes.find(r => r.path === current) || routes[0];
};

async function router() {
    const route = matchRoute();
    const html = await fetch(route.view).then(res => res.text());
    document.getElementById("app").innerHTML = html;
}

document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
    }
});

window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);

document.addEventListener('submit', async (e) => {
    const form = e.target;

    if (!form.matches('#form')) return;

    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (res.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert(data.message || "Submission failed");
        }
    } catch (err) {
        console.error(err);
        alert("Network error");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
