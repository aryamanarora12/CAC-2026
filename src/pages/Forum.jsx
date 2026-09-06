import {
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Divider,
  Select,
  MenuItem,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Drawer,
} from "@mui/material";

import CommentIcon from "@mui/icons-material/Comment";

import Navbar from "../components/components/Global/Navbar";

import { useState, useEffect } from "react";

import { getAuth } from "firebase/auth";

import { db } from "../firebase";

import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import CommentsModal from "../components/components/Global/CommentsModal";


function Forum() {

  const [page, setPage] = useState("read");

  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);


  const [open, setOpen] = useState(false)
  const [questionId, setQuestionId] = useState('')

  const majors = [
    "Science",
    "Art",
    "English",
    "Business",
    "Engineering",
    "Medicine",
    "General/Other",
  ];


  const auth = getAuth();


  // Fetch questions when the page loads
  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        const snapshot = await getDocs(
          collection(db, "forumQuestions")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Questions:", data);

        setQuestions(data);

      } catch (error) {

        console.error(
          "Error fetching questions:",
          error
        );

      } finally {

        setLoading(false);

      }
    };


    fetchQuestions();

  }, []);


  // Submit a new question
  const onSubmit = async () => {

    const user = auth.currentUser;

    if (!user) {
      console.error("No user is logged in");
      return;
    }

    if (!title || !text || !category) {
      console.error("Please fill out all fields");
      return;
    }


    const newQ = {

      title: title,

      text: text,

      username: user.displayName,

      userId: user.uid,

      category: category,

      createdAt: serverTimestamp(),

    };


    try {

      const docRef = await addDoc(
        collection(db, "forumQuestions"),
        newQ
      );


      // Add the new question to the beginning
      // of the existing list
      setQuestions([
        {
          id: docRef.id,
          ...newQ,
          createdAt: new Date(),
        },
        ...questions,
      ]);


      // Clear the form
      setTitle("");
      setText("");
      setCategory("");

      // Go back to the questions page
      setPage("read");

    } catch (error) {

      console.error(
        "Error creating question:",
        error
      );

    }
  };


  const handleChange = (event, newValue) => {

    if (newValue !== null) {
      setPage(newValue);
    }

  };


  return (

    <div className="subpage">

      <Navbar />


      <Stack className="subpage-forum-content">

        {/* Header */}

        <Stack className="subpage-header">

          <Drawer anchor="right" open={open} onClose={() => {
            setOpen(false)
            setQuestionId(null)
          }}>
            <CommentsModal questionId={questionId} />
          </Drawer>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Get Quick Help on the Application Process!
          </Typography>


          <Typography
            variant="h6"
            sx={{
              color: "grey",
              width: "50%",
              textAlign: "left",
              fontSize: 15,
            }}
          >
            Whether you have questions about college
            applications, need help with your personal
            statement, are looking for advice on choosing
            colleges, or just want some guidance along the
            way, our community is here to help you navigate
            the college application process with confidence.
          </Typography>

        </Stack>


        {/* Toggle between posting and reading */}

        <Box>

          <ToggleButtonGroup
            value={page}
            exclusive
            onChange={handleChange}

            sx={{
              "& .MuiToggleButton-root.Mui-selected": {
                color: "white",
                backgroundColor: "#1976d2",
              },
            }}
          >

            <ToggleButton value="post">
              Get Help
            </ToggleButton>

            <ToggleButton value="read">
              Read
            </ToggleButton>

          </ToggleButtonGroup>

        </Box>


        <Divider
          sx={{
            marginTop: 3,
            width: "100%",
            alignSelf: "center",
          }}
        />


        {/* READ QUESTIONS */}

        {page === "read" ? (

          <Stack>

            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
              }}
            >

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  pl: 5,
                  marginTop: 5,
                }}
              >
                Recent Posts
              </Typography>


              <Select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                displayEmpty

                sx={{
                  pr: 5,
                  mr: 5,
                  marginTop: 3,
                  width: "20%",
                }}
              >

                <MenuItem value="">
                  All Categories
                </MenuItem>

                {majors.map((m) => (

                  <MenuItem
                    key={m}
                    value={m}
                  >
                    {m}
                  </MenuItem>

                ))}

              </Select>

            </Stack>


            {/* Questions */}

            <Stack
              spacing={2}
              sx={{
                p: 5,
                alignItems: 'center'
              }}
            >

              {loading ? (

                <Typography>
                  Loading questions...
                </Typography>

              ) : questions.length === 0 ? (

                <Typography>
                  No questions yet. Be the first to ask!
                </Typography>

              ) : (

                questions

                  // Filter by category
                  .filter(
                    (q) =>
                      category === "" ||
                      q.category === category
                  )

                  .map((q) => (

                    <Card
                      key={q.id}

                      sx={{
                        width: "100%",
                        maxWidth: 700,
                        borderRadius: 3,
                        boxShadow: 2,
                      }}
                    >

                      <CardContent sx={{ p: 3 }}>

                        {/* Category */}

                        <Box sx={{ mb: 1.5 }}>

                          <Chip
                            label={q.category}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />

                        </Box>


                        {/* Title */}

                        <Typography
                          variant="h6"
                          component="h2"
                          fontWeight={600}
                          sx={{
                            mb: 1,
                          }}
                        >
                          {q.title}
                        </Typography>


                        {/* Question */}

                        <Typography
                          variant="body1"
                          color="text.secondary"

                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          {q.text}
                        </Typography>


                        <Divider
                          sx={{
                            mb: 2,
                          }}
                        />


                        {/* User + Date */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                              "space-between",
                            gap: 2,
                          }}
                        >

                          <Box>

                            <Typography
                              variant="body2"
                              fontWeight={600}
                            >
                              {q.username}
                            </Typography>


                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {q.createdAt?.toDate
                                ? q.createdAt
                                    .toDate()
                                    .toLocaleDateString()
                                : "Just now"}
                            </Typography>

                          </Box>


                          {/* Comment */}

                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                console.log("Question object:", q);
                                console.log("Question ID:", q.id);

                                setQuestionId(q.id);
                                setOpen(true);
                            }}
                            startIcon={
                              <CommentIcon />
                            }

                            sx={{
                              borderRadius: 2,
                              textTransform:
                                "none",
                            }}
                          >
                            Comment
                          </Button>

                        </Box>

                      </CardContent>

                    </Card>

                  ))

              )}

            </Stack>

          </Stack>


        ) : (

          /* CREATE QUESTION */

          <Stack
            sx={{
              justifySelf: "center",
              alignSelf: "center",
              width: "80%",
              height: "60%",
              mt: 5,
            }}
          >

            <Card
              sx={{
                border: "1px solid grey",
                boxShadow: "none",
                padding: 5,
              }}
            >

              <CardContent>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Get Help Now From a Peer
                </Typography>


                {/* Category */}

                <Stack
                  direction="row"
                  sx={{
                    mt: 5,
                    justifyContent:
                      "space-between",
                  }}
                >

                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    I need help in
                  </Typography>


                  <Select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    displayEmpty

                    sx={{
                      width: "20%",
                    }}
                  >

                    <MenuItem
                      value=""
                      disabled
                    >
                      Choose Category
                    </MenuItem>


                    {majors.map((m) => (

                      <MenuItem
                        key={m}
                        value={m}
                      >
                        {m}
                      </MenuItem>

                    ))}

                  </Select>

                </Stack>


                {/* Title */}

                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    mt: 3,
                  }}
                >
                  Title
                </Typography>


                <TextField
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }

                  label="Title"
                  fullWidth

                  sx={{
                    marginBottom: 5,
                  }}
                />


                {/* Question */}

                <Typography
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  My Question
                </Typography>


                <TextField
                  value={text}

                  onChange={(e) =>
                    setText(e.target.value)
                  }

                  label="Your Question"
                  multiline
                  rows={6}
                  fullWidth
                />


                {/* Submit */}

                <Button
                  onClick={onSubmit}

                  variant="contained"

                  sx={{
                    marginTop: 5,
                    justifySelf:
                      "flex-end",
                  }}
                >
                  Submit
                </Button>

              </CardContent>

            </Card>

          </Stack>

        )}

      </Stack>

    </div>
  );
}


export default Forum;