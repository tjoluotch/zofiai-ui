"use client";

import type React from "react";

import { useState } from "react";
import { Upload, Download, X } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function DocumentUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileCleared, setFileCleared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setFileCleared(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileCleared(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8080/process/document", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("File processed successfully:", result);
      // You can add further logic here to handle the successful response
    } catch (error) {
      console.error("Error processing file:", error);
      setError("Failed to submit CMR file/image. Try again please.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setFileCleared(true);
    // Reset the file input
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    // Add a small delay before resetting the button state
    setTimeout(() => setFileCleared(false), 300);
  };

  return (
    <div className="w-full text-white">
      <div className="w-full max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-serif">
            Exclude Addresses from East Cost West
          </h1>
        </div>

        <Tabs className="w-full">
          <TabsContent className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif mb-4">Upload a CSV</h2>
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400">
                  Upload a .csv file with the following sample information
                </p>
                <Button
                  variant="link"
                  className="text-[#9EFF00] hover:text-[#9EFF00]/80 font-medium rounded-full"
                  asChild
                >
                  <a href="#" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Template
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                You can enter your column headers for up to 5 custom attributes
              </p>
            </div>

            <div className="w-full overflow-x-auto mb-6 rounded-2xl bg-zinc-900 p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    {[
                      "first name",
                      "last name",
                      "email",
                      "shipping address 1",
                      "shipping address 2",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-2 text-left text-gray-400 font-normal"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">John</td>
                    <td className="px-4 py-2">Doe</td>
                    <td className="px-4 py-2">johndoe@gmail.com</td>
                    <td className="px-4 py-2">1139 Adamsville Road ...</td>
                    <td className="px-4 py-2">1139 Adamsville Road ...</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className={`border-2 border-dashed rounded-[32px] p-10 text-center transition-all ${
                dragActive
                  ? "border-[#9EFF00] bg-[#9EFF00]/10"
                  : "border-zinc-800"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                key={file ? file.name : "empty"}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.csv"
                onChange={handleChange}
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="p-4 bg-zinc-900 rounded-full">
                  <Upload className="h-6 w-6 text-[#9EFF00]" />
                </div>
                <div className="text-gray-400">
                  {file ? (
                    <span className="text-[#9EFF00] font-medium">
                      {file.name}
                    </span>
                  ) : (
                    <>Drag & Drop your CMR file or CMR image</>
                  )}
                </div>
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                className={`${
                  fileCleared
                    ? "bg-white text-red-500"
                    : "bg-red-500 text-white"
                } hover:bg-red-600 hover:text-white px-8 rounded-full text-lg h-12 transition-all`}
                onClick={handleClearFile}
                disabled={!file}
              >
                Clear File
              </Button>
              <Button
                className="bg-[#6366F1] hover:bg-[#9EFF00] text-white px-8 rounded-full text-lg h-12 transition-all"
                disabled={!file || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting
                  ? "SUBMITTING..."
                  : isSubmitting === false && file
                  ? "DONE"
                  : "SUBMIT"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Error</h3>
              <Button variant="ghost" size="sm" onClick={() => setError(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p>{error}</p>
            <Button className="mt-4 w-full" onClick={() => setError(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
