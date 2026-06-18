"use client";
import { ChevronRight } from "lucide-react";
import { UploadDropZone } from "./UploadDropZone";
import { Field } from "./Field";
import { useUploadVideo } from "@/hooks/useUploadVideo";
import { UploadStage } from "./UploadStage";

export function UploadVideoSection({editId }: {editId? : string | null}) {
  const {
    availableGenres,
    isLoadingGenres,
    scalarData,
    files,
    tags,
    isUploading,
    uploadProgress,
    uploadStage,
    uploadInsights,
    genres,
    existingThumbnail,
    existingVideo,
    setUploadInsights,
    setUploadStage,
    setFiles,
    setScalarData,
    setTags,
    setGenres,
    handleSubmit,
    onReset,
  } = useUploadVideo(editId);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-5 gap-6"
    >
      {/* Left — drop zone */}
      <div className="lg:col-span-2 bg-neutral-Shade rounded-2xl border border-white/5 p-5 space-y-4">
        <h3 className="font-body text-sm font-semibold text-primary-text/80 uppercase tracking-widest">
          Select Video File
        </h3>
        <UploadDropZone
          onVideoSelect={(file) =>
            setFiles((prev) => ({ ...prev, videoFile: file }))
          }
          onThumbnailSelect={(file) =>
            setFiles((prev) => ({ ...prev, thumbnail: file }))
          }
          videoFile={files.videoFile}
          thumbnail={files.thumbnail}
          existingThumbnail={existingThumbnail}
          existingVideo={existingVideo}
        />
      </div>

      {/* Right — basic details */}
      <div className="lg:col-span-3 bg-neutral-Shade rounded-2xl border border-white/5 p-5 space-y-5">
        <h3 className="font-body text-sm font-semibold text-primary-text/80 uppercase tracking-widest">
          Basic Information
        </h3>

        {/* Title */}
        <Field label="Title" required>
          <input
            name="title"
            value={scalarData.title}
            type="text"
            placeholder="Enter video title"
            className="input-base"
            onChange={(e) =>
              setScalarData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </Field>

        {/* Description */}
        <Field label="Description">
          <textarea
            name="description"
            value={scalarData.description}
            rows={3}
            placeholder="Describe your video content..."
            className="input-base resize-none"
            onChange={(e) =>
              setScalarData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </Field>

        {/* Genres */}
        <Field label="Genres" required>
          <select
            className="input-base mt-2"
            value=""
            onChange={(e) => {
              const id = e.target.value;
              if (id && !genres.includes(id)) {
                setGenres((prev) => [...prev, id]);
              }
            }}
          >
            <option value="" disabled>
              Add a genre
            </option>
            {availableGenres
              .filter((g) => !genres.includes(String(g.id)))
              .map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
          </select>

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {genres.map((id) => {
                const genre = availableGenres.find((g) => String(g.id) === id);
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary-active/20 border border-primary-active/30 text-primary-text text-xs"
                  >
                    {genre?.name}
                    <button
                      type="button"
                      onClick={() =>
                        setGenres((prev) => prev.filter((g) => g !== id))
                      }
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </Field>

        {/* Row: Release Year / Content Rating / Language */}
        <div className="grid grid-cols-3 gap-3">
          <Field label="Release Year">
            <input
              name="releaseYear"
              type="number"
              value={scalarData.releaseYear}
              className="input-base"
              onChange={(e) =>
                setScalarData((prev) => ({
                  ...prev,
                  releaseYear:
                    e.target.value || String(new Date().getFullYear()),
                }))
              }
            />
          </Field>
          <Field label="Content Rating">
            <select
              name="contentRating"
              value={scalarData.contentRating}
              className="input-base"
              onChange={(e) =>
                setScalarData((prev) => ({
                  ...prev,
                  contentRating: e.target.value,
                }))
              }
            >
              <option value="">Select...</option>
              <option>G</option>
              <option>PG</option>
              <option>PG-13</option>
              <option>R</option>
              <option>NC-17</option>
            </select>
          </Field>
          <Field label="Language">
            <select
              name="language"
              value={scalarData.language}
              className="input-base"
              onChange={(e) =>
                setScalarData((prev) => ({ ...prev, language: e.target.value }))
              }
            >
              <option value="English">English</option>
              <option value="Nepali">Nepali</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
            </select>
          </Field>
        </div>

        {/* Tags */}
        <Field label="Tags">
          <div className="flex gap-2">
            <input
              name="tag"
              type="text"
              value={tags.join(", ")}
              placeholder="Type tag name..."
              className="input-base flex-1"
              onChange={(e) =>
                setTags(e.target.value.split(",").map((tag) => tag.trim()))
              }
            />
            <button
              type="button"
              className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-tertiary-Shade hover:text-primary-active hover:border-primary-active/30 transition-colors"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
        </Field>

        <UploadStage
          uploadStage={uploadStage}
          uploadProgress={uploadProgress}
          uploadInsights={uploadInsights}
          isUploading={isUploading}
          onReset={onReset}
        />
      </div>
    </form>
  );
}
