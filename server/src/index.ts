import { Hono } from "hono";
import { openElectricityApiResponseSchema } from "../../lib/schemas/facilities";

interface Env {
  OPEN_ELECTRICITY_API_TOKEN: string;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/api/message", async (c) => {
  try {
    const res = await fetch(
      "https://api.openelectricity.org.au/v4/facilities",
      {
        headers: {
          Authorization: `Bearer ${c.env.OPEN_ELECTRICITY_API_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return c.json({ error: "Failed to fetch facilities" }, 500);
    }

    const rawData = await res.json();

    const validatedApiData = openElectricityApiResponseSchema.parse(rawData);

    return c.json({
      message: "✅ Hello world.",
      data: validatedApiData,
    });
  } catch (error) {
    console.error("API or validation error:", error);
    return c.json({ error: "Invalid data format from external API" }, 500);
  }
});

export default app;
