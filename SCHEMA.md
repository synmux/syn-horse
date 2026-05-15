# Zod Schema

What follows is pseudocode.

```jsonc
{
  "contact": "String, may be a phone number, email address, or anything else",
  "message": "String, the message which was entered to page me",
  "source": "String, an IP address or hostname of the person requesting the page", // optional
  "counter": {
    // optional
    "day": "Integer, how many requests this person has submitted in the last 24 hours", // optional due to being a child of counter
    "hour": "Integer, how many requests this person has submitted in the last hour", // optional due to being a child of counter
    "lifetime": "Integer, how many requests this person has submitted in total", // optional due to being a child of counter
  },
}
```

Convert this into a meaningful Zod schema and create a utility library in schema.ts to validate messages against it and any other functionality which might be useful. use context7 to get up-to-date Zod documentation instead of relying on your existing knowledge. You're also welcome to fetch info from the Web.
