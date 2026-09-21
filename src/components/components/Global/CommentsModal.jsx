import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";

import { useState, useEffect } from "react";

import { getAuth } from "firebase/auth";

import { db } from "../../../firebase";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";


export default function CommentsModal({ questionId }) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const auth = getAuth();


  // Fetch comments for this question
useEffect(() => {
  if (!questionId) return;

  const fetchComments = async () => {
    setLoading(true);

    try {
      const commentsQuery = query(
        collection(db, "comments"),
        where("questionId", "==", questionId)
      );

      const snapshot = await getDocs(commentsQuery);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort oldest → newest
      data.sort((a, b) => {
        const timeA = a.createdAt?.toDate
          ? a.createdAt.toDate().getTime()
          : 0;

        const timeB = b.createdAt?.toDate
          ? b.createdAt.toDate().getTime()
          : 0;

        return timeA - timeB;
      });

      setComments(data);

    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchComments();
}, [questionId]);


  // Add a new comment
  const handleSubmit = async () => {

    const user = auth.currentUser;

    if (!user) {
      console.error("No user is logged in");
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    setSubmitting(true);

    try {

      const newComment = {
        content: commentText.trim(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
        questionId: questionId,
        createdAt: serverTimestamp(),
      };


      const docRef = await addDoc(
        collection(db, "comments"),
        newComment
      );


      // Immediately add it to the UI
      setComments((prev) => [
        ...prev,
        {
          id: docRef.id,
          ...newComment,
          createdAt: new Date(),
        },
      ]);


      // Clear textbox
      setCommentText("");

    } catch (error) {

      console.error("Error adding comment:", error);

    } finally {

      setSubmitting(false);

    }
  };


  return (

    <Box
      sx={{
        width: 450,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Header */}

      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
        >
          Comments
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Join the conversation
        </Typography>
      </Box>


      {/* Comments */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >

        {loading ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>

        ) : comments.length === 0 ? (

          <Box
            sx={{
              textAlign: "center",
              mt: 5,
            }}
          >

            <Typography
              variant="body1"
              color="text.secondary"
            >
              No comments yet.
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Be the first to comment!
            </Typography>

          </Box>

        ) : (

          <Stack spacing={2}>

            {comments.map((comment) => (

              <Paper
                key={comment.id}
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >

                {/* Username */}

                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                >
                  {comment.username}
                </Typography>


                {/* Date */}

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {comment.createdAt?.toDate
                    ? comment.createdAt
                        .toDate()
                        .toLocaleString()
                    : "Just now"}
                </Typography>


                {/* Comment text */}

                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                  }}
                >
                  {comment.content}
                </Typography>

              </Paper>

            ))}

          </Stack>

        )}

      </Box>


      {/* Comment input */}

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #ddd",
          backgroundColor: "white",
        }}
      >

        <TextField
          value={commentText}
          onChange={(e) =>
            setCommentText(e.target.value)
          }
          placeholder="Write a comment..."
          multiline
          maxRows={4}
          fullWidth
          size="small"
        />

        <Button
          variant="contained"
          fullWidth
          disabled={
            submitting ||
            !commentText.trim()
          }
          onClick={handleSubmit}
          sx={{
            mt: 1,
            textTransform: "none",
          }}
        >
          {submitting ? (
            <CircularProgress
              size={22}
              color="inherit"
            />
          ) : (
            "Post Comment"
          )}
        </Button>

      </Box>

    </Box>
  );
}