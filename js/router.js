const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const routes = [
    { path: "/", view: "/pages/home.html" },
    { path: "/about", view: "/pages/about.html" },
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