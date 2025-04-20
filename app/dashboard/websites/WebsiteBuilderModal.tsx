"use client";

import React, { useState } from "react";

interface WebsiteBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuild: (options: any) => void;
}

export function WebsiteBuilderModal({ isOpen, onClose, onBuild }: WebsiteBuilderModalProps) {
  const [template, setTemplate] = useState("template1");
  const [siteTitle, setSiteTitle] = useState("");
  const [properties, setProperties] = useState<string[]>([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full p-6 space-y-6">
        <h2 className="text-2xl font-bold">Create New Website</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Site Title</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full rounded border px-3 py-2"
              placeholder="My Vacation Rentals"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Choose a Template</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["template1", "template2", "template3"].map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => setTemplate(tpl)}
                  className={`border rounded-lg p-4 hover:shadow-md transition ${
                    template === tpl ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="h-24 bg-muted mb-2 rounded"></div>
                  <div className="font-semibold capitalize">{tpl}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Select Properties</label>
            <p className="text-sm text-muted-foreground mb-2">Choose which properties to showcase.</p>
            <div className="flex flex-wrap gap-2">
              {/* Replace with real property data */}
              {["Property A", "Property B", "Property C"].map((prop) => (
                <button
                  key={prop}
                  onClick={() =>
                    setProperties((prev) =>
                      prev.includes(prop)
                        ? prev.filter((p) => p !== prop)
                        : [...prev, prop]
                    )
                  }
                  className={`px-3 py-1 rounded border ${
                    properties.includes(prop) ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {prop}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onBuild({ template, siteTitle, properties })}
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            Build Website
          </button>
        </div>
      </div>
    </div>
  );
}
