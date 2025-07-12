import type { Facility } from "../../../../lib/schemas/facilities";

export const cleanDescription = (description?: string): string => {
  if (!description) return "No description available";
  // Remove HTML tags, specifically <p> tags
  return (
    description.replace(/<[^>]*>/g, "").trim() || "No description available"
  );
};

export const formatCapacity = (capacity?: number): string => {
  return capacity ? `${capacity.toLocaleString()} MW` : "N/A";
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleString("en-AU");
  } catch {
    return "N/A";
  }
};

export const formatLastUpdated = (dateString?: string): string => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "N/A";

    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });
    }
  } catch (error) {
    return "N/A";
  }
};

export const getMostRecentUpdate = (facility: Facility): string => {
  if (!facility.units?.length) return "N/A";

  const dates = facility.units
    .map((unit) => unit.data_last_seen)
    .filter((date) => date && !isNaN(new Date(date).getTime()))
    .map((date) => new Date(date!));

  if (dates.length === 0) return "N/A";

  const mostRecent = new Date(Math.max(...dates.map((date) => date.getTime())));
  return formatLastUpdated(mostRecent.toISOString());
};
