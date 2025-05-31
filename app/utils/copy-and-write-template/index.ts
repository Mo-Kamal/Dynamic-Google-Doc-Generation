import { NextResponse } from "next/server";
import { google } from "googleapis";
import stream from "stream";
import fs from "fs";
import path from "path";
import { getCurrentDate } from "@/app/utils/get-current-date";
import { streamToBuffer } from "../stream-to-buffer";

interface IcopyAndWriteTemplateProps {
  position?: string;
  company: string;
  hiringManager?: string;
}
// Replace with your actual Google Docs template ID
const TEMPLATE_ID = process.env.GOOGLE_TEMPLATES_ID;

// Function to copy a Google Docs template, replace placeholders, and write the result as a PDF
// to a local directory based on the current date and company name
// This function uses Google Drive and Docs APIs to perform the operations
// It requires the GOOGLE_CREDENTIALS_PATH and GOOGLE_TEMPLATES_ID environment variables to be set
// The GOOGLE_CREDENTIALS_PATH should point to a JSON file with the service account credentials
export const copyAndWriteTemplate = async ({
  company = "",
  position = "Front-End Developer",
  hiringManager = "Hiring Manager",
}: IcopyAndWriteTemplateProps) => {
  // Initialize Google Auth
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_CREDENTIALS_PATH,
    scopes: [
      "https://www.googleapis.com/auth/documents",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  // Authenticate and create Google Drive and Docs clients
  const authClient = await auth.getClient();
  const drive = google.drive({ version: "v3", auth: authClient as any });
  const docs = google.docs({ version: "v1", auth: authClient as any });

  let newDocId = "";

  try {
    // 1. Copy the template
    const copyResponse = await drive.files.copy({
      fileId: TEMPLATE_ID,
      requestBody: {
        name: `CoverLetter-${position}-${company}`,
      },
    });
    newDocId = copyResponse.data.id!;
    console.log("Copied template:", newDocId);
    // Get current date
    const { month, day, formattedDate } = getCurrentDate();
    console.log("Current date:", formattedDate);
    console.log("Position:", position);
    console.log("Company:", company);
    console.log("Hiring Manager:", hiringManager);

    // 2. Replace placeholders
    await docs.documents.batchUpdate({
      documentId: newDocId,
      requestBody: {
        requests: [
          {
            replaceAllText: {
              containsText: { text: "{{position}}", matchCase: true },
              replaceText: position,
            },
          },
          {
            replaceAllText: {
              containsText: { text: "{{company}}", matchCase: true },
              replaceText: company,
            },
          },
          {
            replaceAllText: {
              containsText: { text: "{{hiringManager}}", matchCase: true },
              replaceText: hiringManager,
            },
          },
          {
            replaceAllText: {
              containsText: { text: "{{date}}", matchCase: true },
              replaceText: formattedDate,
            },
          },
        ],
      },
    });
    console.log("Replaced text in copied document");

    // 3. Export the document as PDF
    const pdfResponse = await drive.files.export(
      {
        fileId: newDocId,
        mimeType: "application/pdf",
      },
      { responseType: "stream" }
    );
    const bufferStream = await streamToBuffer(
      pdfResponse.data as unknown as stream.Readable
    );
    console.log("Exported document as PDF");
    // Create folders and write PDF
    const saveDir = path.join(
      process.env.HOME || process.env.USERPROFILE || "",
      "Documents",
      "CV",
      `${month.toLowerCase()}${day}`,
      company.replace(/[\/\\?%*:|"<>]/g, "")
    );
    fs.mkdirSync(saveDir, { recursive: true });

    const filePath = path.join(saveDir, `CoverLetter-${position}.pdf`);
    fs.writeFileSync(filePath, bufferStream);
    console.log("Saved PDF locally at:", filePath);

    // 4. Delete the copied document
    await drive.files.delete({ fileId: newDocId });
    console.log("Deleted temporary copied document");

    // 5. Return success response
    return NextResponse.json(
      {
        message: `PDF file generated successfully for ${company}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing document:", error);
    if (newDocId) {
      try {
        await drive.files.delete({ fileId: newDocId });
        console.log("Deleted copied document after error");
      } catch (delError) {
        console.error("Failed to delete copied document:", delError);
      }
    }
    // Return error response
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
