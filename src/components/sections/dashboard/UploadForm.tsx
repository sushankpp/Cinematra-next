import { ChevronRight } from "lucide-react";
import { UploadDropZone } from "./UploadDropZone";
import { Field } from "./Field";

export function UploadVideoSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left — drop zone */}
      <div className="lg:col-span-2 bg-neutral-Shade rounded-2xl border border-white/5 p-5 space-y-4">
        <h3 className="font-body text-sm font-semibold text-primary-text/80 uppercase tracking-widest">
          Select Video File
        </h3>
        <UploadDropZone />
      </div>

      {/* Right — basic details */}
      <div className="lg:col-span-3 bg-neutral-Shade rounded-2xl border border-white/5 p-5 space-y-5">
        <h3 className="font-body text-sm font-semibold text-primary-text/80 uppercase tracking-widest">
          Basic Information
        </h3>

        {/* Title */}
        <Field label="Title" required>
          <input
            type="text"
            placeholder="Enter video title"
            className="input-base"
          />
        </Field>

        {/* Description */}
        <Field label="Description">
          <textarea
            rows={3}
            placeholder="Describe your video content..."
            className="input-base resize-none"
          />
        </Field>

        {/* Genres */}
        <Field label="Genres" required>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type genre name..."
              className="input-base flex-1"
            />
            <button className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-tertiary-Shade hover:text-primary-active hover:border-primary-active/30 transition-colors">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
          <select className="input-base mt-2">
            <option value="">Or select from existing genres...</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Comedy</option>
            <option>Thriller</option>
          </select>
        </Field>

        {/* Row: Release Year / Content Rating / Language */}
        <div className="grid grid-cols-3 gap-3">
          <Field label="Release Year">
            <input
              type="number"
              defaultValue={new Date().getFullYear()}
              className="input-base"
            />
          </Field>
          <Field label="Content Rating">
            <select className="input-base">
              <option value="">Select...</option>
              <option>G</option>
              <option>PG</option>
              <option>PG-13</option>
              <option>R</option>
              <option>NC-17</option>
            </select>
          </Field>
          <Field label="Language">
            <select className="input-base">
              <option>English</option>
              <option>Nepali</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </Field>
        </div>

        {/* Tags */}
        <Field label="Tags">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type tag name..."
              className="input-base flex-1"
            />
            <button className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-tertiary-Shade hover:text-primary-active hover:border-primary-active/30 transition-colors">
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </Field>

        {/* Submit */}
        <div className="flex justify-end pt-1">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-active hover:bg-primary-active/85 text-white text-sm font-body font-semibold transition-colors duration-200">
            Upload & Continue
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}