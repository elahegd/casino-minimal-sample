import data from "./mock-data.json" with { type: "json" };

function corsResponse(body, status = 200) {
    const headers = new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    });

    return new Response(body, { status, headers });
}

async function handler(req) {
    if (req.method === "OPTIONS") {
        return corsResponse(null, 204); // Quick return for OPTIONS preflight
    }

    const gamesRoute = new URLPattern({ pathname: "/games" });
    const gameRoute = new URLPattern({ pathname: "/games/:gameId" });
    const categoriesRoute = new URLPattern({ pathname: "/categories" });
    const loginRoute = new URLPattern({ pathname: "/login" });
    const logoutRoute = new URLPattern({ pathname: "/logout" });
    const url = new URL(req.url);

    if (loginRoute.test(url) && req.method === "POST") {
        const body = await req.json();
        const username = body.username;
        const password = body.password;

        if (
            username in data.players &&
            data.players[username].password === password
        ) {
            const user = {
                name: data.players[username].name,
                avatar: data.players[username].avatar,
                event: data.players[username].event,
            };
            return corsResponse(JSON.stringify(user));
        } else {
            return corsResponse(
                JSON.stringify({ error: "User Not Found" }),
                404,
            );
        }
    } else if(logoutRoute.test(url) && req.method === "POST") {
        const body = await req.json();
        const username = body.username;
        if (username in data.players) {
            return corsResponse(JSON.stringify({ status: "success" }));
        }
    } else if (gamesRoute.test(url)) {
        return corsResponse(JSON.stringify(data.games));
    } else if (gameRoute.test(url)) {
        const match = gameRoute.exec(url);
        const gameId = match.pathname.groups.gameId;
        const game = data.games.find((item) => item.code === gameId);
        if (game) {
            return corsResponse(JSON.stringify(game));
        } else {
            return corsResponse(
                JSON.stringify({ error: "Game Not Found" }),
                404,
            );
        }
    } else if (categoriesRoute.test(url)) {
        return corsResponse(JSON.stringify(data.categories));
    }

    // fallback route
    return corsResponse(JSON.stringify({ error: "Route Not Found" }), 404);
}

Deno.serve({ port: 3001 }, handler);
