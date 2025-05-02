use actix_web::{get, App, HttpServer, Responder, HttpResponse};
use serde::Serialize;
use once_cell::sync::Lazy;

#[derive(Serialize)]
struct Item {
    message: &'static str,
}

static ITEMS: Lazy<Vec<Item>> = Lazy::new(|| {
    (0..100)
        .map(|_| Item { message: "Hello World" })
        .collect()
});

#[get("/hello-world")]
async fn hello_world() -> impl Responder {
    HttpResponse::Ok().json(&*ITEMS)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(hello_world)
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
