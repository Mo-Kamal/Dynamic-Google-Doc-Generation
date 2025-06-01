import { NextResponse } from "next/server";
import { startPageScrapping } from "@/app/utils/start-page-scrapping";
import { getInfoFromScrappedPage } from "@/app/utils/get-info-from-scrapped-page";
import { copyAndWriteTemplate } from "@/app/utils/copy-and-write-template";

export async function POST(request: Request) {
  let jobLink: string, position: string, company: string, hiringManager: string;
  jobLink = position = company = hiringManager = "";
  const params = await request.json();

  // params.jobLink or params.company Should be provided
  if (!params.jobLink && !params.company) {
    return NextResponse.json(
      { error: "Either jobLink or company must be provided." },
      { status: 400 }
    );
  }

  if (params.jobLink) {
    console.log("Scraping job link:", params.jobLink);

    let jobLink = params.jobLink;
    try {
      console.log("Fetching job link:", jobLink);

      // Fetch the job link using scrapingbee
      const response = await startPageScrapping(jobLink);

      const {
        scrappedCompanyName,
        scrappedPosition,
        scrappedHiringManagerName,
      } = getInfoFromScrappedPage(response);

      // Return an error if the company name is not found
      if (scrappedCompanyName) {
        company = scrappedCompanyName;
      } else {
        return NextResponse.json(
          { error: "Company name not found in the job link." },
          { status: 400 }
        );
      }

      // Assign the position and hiring manager if they are found
      if (scrappedPosition) position = scrappedPosition;
      if (scrappedHiringManagerName) hiringManager = scrappedHiringManagerName;
    } catch (error) {
      console.error("Error scraping job link:", error);
    }
  }

  // Use the company and position from params if provided
  // These will override the scraped values even if they exist
  if (params.company) company = params.company;
  if (params.position) position = params.position;
  if (params.hiringManager) hiringManager = params.hiringManager;
  console.log("Final values:", {
    position,
    company,
    hiringManager: hiringManager,
  });

  return await copyAndWriteTemplate({
    position,
    company,
    hiringManager,
  });
}
