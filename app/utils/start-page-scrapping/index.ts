import toast from "react-hot-toast";
import scrapingbee from "scrapingbee";

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY || "";

export async function startPageScrapping(url: string) {
  // cehck if the URL is valid
  if (!url || !/^https?:\/\//.test(url)) {
    toast.error("Please provide a valid URL.");
  }

  var client = new scrapingbee.ScrapingBeeClient(SCRAPER_API_KEY);
  var response = await client.get({
    url: url,
    params: {},
  });
  return response;
}
