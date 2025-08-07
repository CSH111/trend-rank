// components/JobItem
"use client";

import { useTitleQuery } from "@/hooks/useTitleQuery";
import { CircularProgress } from "@mui/material";

interface TitleDisplayProps {
  url: string;
  showUrl?: boolean;
  maxLength?: number;
}

const JobItem = ({ url, showUrl = true, maxLength = 100 }: TitleDisplayProps) => {
  const { title, loading, error, refetch } = useTitleQuery(url);

  const truncateTitle = (text: string, max: number) => {
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  return (
    <div className="title-display">
      {showUrl && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="url-link"
          style={{
            wordBreak: "break-all",
            fontSize: "14px",
            color: "#1976d2",
            textDecoration: "none",
          }}
        >
          {url}
        </a>
      )}

      <div style={{ marginTop: "8px", minHeight: "20px" }}>
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CircularProgress size={16} />
            <span style={{ color: "#666", fontSize: "12px" }}>Loading title...</span>
          </div>
        )}

        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#f44336", fontSize: "12px" }}>Failed to load title</span>
            <button
              onClick={() => refetch()}
              style={{
                background: "none",
                border: "1px solid #f44336",
                color: "#f44336",
                fontSize: "10px",
                padding: "2px 6px",
                cursor: "pointer",
                borderRadius: "3px",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {title && (
          <div
            style={{
              color: "#333",
              fontSize: "13px",
              fontWeight: 500,
              lineHeight: 1.3,
            }}
            title={title} // 전체 title을 tooltip으로
          >
            {truncateTitle(title, maxLength)}
          </div>
        )}

        {!loading && !error && !title && (
          <span style={{ color: "#999", fontSize: "12px" }}>No title found</span>
        )}
      </div>
    </div>
  );
};

export default JobItem;
