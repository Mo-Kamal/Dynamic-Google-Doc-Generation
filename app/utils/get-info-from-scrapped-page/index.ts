import * as cheerio from "cheerio";
import { AxiosResponse } from "axios";

/**
 * This function extracts information from a scrapped page.
 * It uses cheerio to parse the HTML and extract the company name,
 * position name, and hiring manager name.
 *
 * Note: This function is specifically designed for LinkedIn job postings,
 * and may not work correctly for other job boards.
 *
 * @param {AxiosResponse} scrappedResult - The response from the scraping service.
 * @returns {Object} An object containing the company name, position name,
 * and hiring manager name, or null if the company name is not found.
 */
export const getInfoFromScrappedPage = (scrappedResult: AxiosResponse) => {
  console.log("Response received from scrapingbee:", scrappedResult);

  // get the company name and position name from the scrappedResult
  const $ = cheerio.load(scrappedResult.data);
  let scrappedPosition = $("h1").first().text().trim();
  let scrappedCompanyName =
    $(".topcard__org-name-link").text().trim() ||
    $(".topcard__flavor").text().trim();
  if (!scrappedCompanyName) {
    scrappedCompanyName = $(".base-main-card__subtitle").text().trim();
  }

  console.log("Scraped company name:", scrappedCompanyName);
  console.log("Scraped job title:", scrappedPosition);
  console.log("Searching for hiring manager...");
  // get the hiring manager name from the response
  // this is a LinkedIn specific selector, so it might not work for other job boards
  const scrappedHiringManagerName = $(".message-the-recruiter")
    .find(".base-main-card h3.base-main-card__title")
    .first()
    .text()
    .trim();
  console.log("hiringManager", scrappedHiringManagerName);

  return {
    scrappedCompanyName,
    scrappedPosition,
    scrappedHiringManagerName,
  };
};
