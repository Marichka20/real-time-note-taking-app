import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../store";
import { setContent } from "../store";
import "react-quill/dist/quill.snow.css";
import "../styles.less";
import Preview from "./Preview";
import ConnectionLostModal from "./shared/Modal"; // Import the new component

const Editor: React.FC = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.login.content);

  const socketRef = useRef<Socket | null>(null);
  const quillRef = useRef<ReactQuill | null>(null);
  const [localContent, setLocalContent] = useState(content);
  const [isConnected, setIsConnected] = useState(true); // Track WebSocket connection status
  const isUpdatingFromServer = useRef(false); // Prevents unnecessary updates

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = io("http://localhost:5000");

    socketRef.current.on("connect", () => {
      console.log(
        "Connected to WebSocket server with socket ID:",
        socketRef.current?.id
      );
      setIsConnected(true); // Update connection status
    });

    // Handle disconnection
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false); // Update connection status
    });

    // Load initial content from the server
    socketRef.current.on("load-notes", (initialContent: string) => {
      console.log("Loaded initial content:", initialContent);
      if (initialContent !== localContent) {
        isUpdatingFromServer.current = true; // Mark as external update
        dispatch(setContent(initialContent || ""));
        setLocalContent(initialContent || "");
      }
    });

    // Handle real-time updates from other users
    socketRef.current.on("update-notes", (updatedContent: string) => {
      console.log("Received updated content:", updatedContent);
      if (updatedContent !== localContent) {
        isUpdatingFromServer.current = true; // Mark as external update
        setLocalContent(updatedContent);
        dispatch(setContent(updatedContent));
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [dispatch]);

  const handleTextChange = (
    value: string,
    delta: any,
    source: string,
    editor: any
  ) => {
    const newContent = editor.getContents();

    // Ignore change if it's coming from server
    if (isUpdatingFromServer.current) {
      isUpdatingFromServer.current = false; // Reset flag after handling server update
      return;
    }

    if (newContent !== localContent) {
      setLocalContent(newContent);
      dispatch(setContent(newContent));
      console.log("Emitting content:", newContent);
      socketRef.current?.emit("update-notes", newContent);
    }
  };

  // Sync with Redux content if changed externally
  useEffect(() => {
    if (content !== localContent) {
      isUpdatingFromServer.current = true; // Prevent sending WebSocket updates unnecessarily
      setLocalContent(content);

      // Restore focus after update
      quillRef.current?.focus();
    }
  }, [content]);

  // Auto-focus the editor when the component mounts
  useEffect(() => {
    quillRef.current?.focus();
  }, []);

  return (
    <div className="editor-preview-container">
      {/* Render the ConnectionLostModal when disconnected */}
      {!isConnected && (
        <ConnectionLostModal
          title="Connection Lost"
          message="You have been disconnected from the server. Please check your internet connection and try again."
          onClose={() => setIsConnected(true)}
        />
      )}

      {/* Render the editor and preview when connected */}
      {isConnected && (
        <>
          <div
            className="editor-container"
            tabIndex={0} // Makes div focusable
            onClick={() => quillRef.current?.focus()} // Ensure focus on first click
            onKeyDown={(e) => quillRef.current?.focus()} // Handle keyboard input
          >
            <h1>Notes</h1>
            <div className="quill-wrapper">
              <ReactQuill
                ref={quillRef}
                value={localContent}
                onChange={handleTextChange}
                className="quill-editor"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                  "list",
                  "bullet",
                  "link",
                  "image",
                ]}
              />
            </div>
          </div>
          <Preview content={localContent} />
        </>
      )}
    </div>
  );
};

export default Editor;
