export const API_URL: any = process.env.NEXT_PUBLIC_API_URL;

export const API_OPTIONS: any = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_API_HOST,
  },
};