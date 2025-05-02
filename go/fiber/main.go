package main

import (
	"github.com/gofiber/fiber/v2"
)

type Item struct {
	Message string `json:"message"`
}

var items []Item

func init() {
	for i := 0; i < 100; i++ {
		items = append(items, Item{Message: "Hello World"})
	}
}

func main() {
	app := fiber.New()

	app.Get("/hello-world", func(c *fiber.Ctx) error {
		return c.JSON(items)
	})

	app.Listen(":8000")
}
