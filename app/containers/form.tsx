"use client";
import React from "react";
import { CInput } from "../components/input";
import { CButton } from "../components/button";
import toast from "react-hot-toast";
import { ENDPONITS } from "../endpoints";

type FormState = {
  position: string;
  company: string;
  hiringManager: string;
  jobLink: string;
};

export const FormGoogleDocxComponent = () => {
  const [form, setForm] = React.useState<FormState>({
    position: "",
    company: "",
    hiringManager: "",
    jobLink: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(ENDPONITS.GENERATE_GOOGLE_DOCX, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const generateDocResponse = await response.json();
      console.log("Response:", generateDocResponse);
      toast.success(
        generateDocResponse?.message || "PDF file generated successfully!"
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate PDF file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 ">Save Google Doc to Local PDF</h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <CInput
          type="url"
          name="jobLink"
          value={form.jobLink}
          onChange={handleChange}
          label="Job Link"
        />
        <CInput
          type="text"
          name="position"
          value={form.position}
          onChange={handleChange}
          label="Position Name"
        />
        <CInput
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          label="Company Name"
        />
        <CInput
          type="text"
          name="hiringManager"
          value={form.hiringManager}
          onChange={handleChange}
          label="Hiring Manager Name"
        />
        <CButton type="submit" isLoading={isLoading}>
          {isLoading ? "Generating..." : "Generate Cover Letter"}
        </CButton>
      </form>
    </>
  );
};
