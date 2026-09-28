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
  const [connections, setConnections] = useState({});
  const [peopleCursor, setPeopleCursor] = useState(0);

  const peoplePool = [
    {
      id: "mentor-mia",
      name: "Mia Chen",
      headline: "Admissions Mentor",
      school: "University of Michigan",
      location: "Ann Arbor, MI",
      mutual: 12,
      role: "College Admissions",
      tags: ["Essay Review", "Scholarships"],
    },
    {
      id: "mentor-noah",
      name: "Noah Brooks",
      headline: "STEM Opportunity Coach",
      school: "Georgia Tech",
      location: "Atlanta, GA",
      mutual: 8,
      role: "Engineering Pathways",
      tags: ["Research", "Internships"],
    },
    {
      id: "mentor-aya",
      name: "Aya Patel",
      headline: "Career Explorer",
      school: "Northeastern University",
      location: "Boston, MA",
      mutual: 16,
      role: "Career Planning",
      tags: ["Mentorship", "Networking"],
    },
    {
      id: "mentor-lee",
      name: "Lee Wilson",
      headline: "Research Programs Guide",
      school: "University of Texas",
      location: "Austin, TX",
      mutual: 9,
      role: "Research Pathways",
      tags: ["Research", "STEM"],
    },
    {
      id: "mentor-sara",
      name: "Sara Ramos",
      headline: "Scholarship Finder",
      school: "University of Florida",
      location: "Gainesville, FL",
      mutual: 19,
      role: "Financial Aid",
      tags: ["Scholarships", "Aid"],
    },
    {
      id: "mentor-omar",
      name: "Omar Davis",
      headline: "Career Growth Mentor",
      school: "University of North Carolina",
      location: "Chapel Hill, NC",
      mutual: 6,
      role: "Career Planning",
      tags: ["Resume", "Internships"],
    },
  ];

  const [recommendedPeople, setRecommendedPeople] = useState(
    peoplePool.slice(0, 3)
  );

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

  const toggleConnection = (id) => {
    setConnections((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const refreshPeople = () => {
    const nextPeople = [];

    for (let i = 0; i < 3; i += 1) {
      const nextIndex = (peopleCursor + i) % peoplePool.length;
      nextPeople.push(peoplePool[nextIndex]);
    }

    setPeopleCursor((current) => (current + 3) % peoplePool.length);
    setRecommendedPeople(nextPeople);
  };


  return (

    <div className="subpage">

      <Navbar />


      <Stack className="subpage-content">

        {/* Header */}

        <Stack className="subpage-header">

          <Drawer anchor="right" open={open} onClose={() => {
            setOpen(false)
            setQuestionId(null)
          }}>
            <CommentsModal questionId={questionId} />
          </Drawer>
          <p className="subpage-eyebrow">Community support</p>
          <Typography component="h1" className="subpage-title">
            Forum
          </Typography>
          <Typography component="p" className="subpage-description">
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
                  fontFamily: "var(--heading)",
                  fontWeight: 700,
                  color: "var(--text-h)",
                  textAlign: "left",
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

            <Stack
              direction={{ xs: "column", lg: "row" }}
              spacing={3}
              sx={{
                mt: 3,
                alignItems: "flex-start",
              }}
            >

              <Stack
                spacing={2}
                sx={{
                  flex: 1,
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
                                <span>💬</span>
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

              <Card
                sx={{
                  width: { xs: "100%", lg: 340 },
                  borderRadius: 4,
                  boxShadow: 3,
                  border: "1px solid var(--border)",
                  background: "linear-gradient(180deg, #ffffff 0%, #eef3ff 100%)",
                  position: "sticky",
                  top: 24,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box>
                        <Typography sx={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: 1.2, textTransform: "uppercase" }}>
                          People Network
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: "var(--heading)", fontWeight: 800, color: "var(--text-h)", mt: 1 }}>
                          Connect With Mentors
                        </Typography>
                      </Box>
                      <Box sx={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                        ∞
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<span>↻</span>}
                        onClick={refreshPeople}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontWeight: 700,
                          color: "var(--accent)",
                          borderColor: "var(--accent-border)",
                        }}
                      >
                        Refresh
                      </Button>
                    </Box>

                    <Divider />

                    {recommendedPeople.map((person) => (
                      <Card key={person.id} sx={{ borderRadius: 3, boxShadow: 0, border: "1px solid var(--border)", background: "rgba(255,255,255,0.86)" }}>
                        <CardContent sx={{ p: 2 }}>
                          <Stack spacing={1.5}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18 }}>
                                {person.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ fontWeight: 800, color: "var(--text-h)", fontSize: 14 }}>{person.name}</Typography>
                                <Typography sx={{ fontSize: 12, color: "var(--text)", fontWeight: 600 }}>{person.headline}</Typography>
                              </Box>
                            </Box>

                            <Box>
                              <Typography sx={{ fontSize: 12, color: "var(--text)", fontWeight: 700 }}>{person.school}</Typography>
                              <Typography sx={{ fontSize: 11, color: "var(--text)", mt: 0.4 }}>{person.location}</Typography>
                            </Box>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                              {person.tags.map((tag) => (
                                <Chip key={tag} label={tag} size="small" sx={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", fontWeight: 700, borderRadius: 4 }} />
                              ))}
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Typography sx={{ fontSize: 12, color: "var(--text)", fontWeight: 700 }}>{person.mutual} mutuals</Typography>
                              <Button
                                size="small"
                                variant={connections[person.id] ? "contained" : "outlined"}
                                onClick={() => toggleConnection(person.id)}
                                sx={{
                                  borderRadius: 999,
                                  textTransform: "none",
                                  minWidth: 96,
                                  fontWeight: 700,
                                  backgroundColor: connections[person.id] ? "var(--accent)" : "transparent",
                                  color: connections[person.id] ? "#fff" : "var(--accent)",
                                }}
                              >
                                {connections[person.id] ? "Connected" : "Connect"}
                              </Button>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

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