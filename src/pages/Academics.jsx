import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { intialRequest, sendMessageToGenAI } from "../chatbotfunctions";

function Academics() {
  const auth = getAuth();
  const [profileName, setProfileName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previousChats, setPreviousChats] = useState([])

  const chatRef = useRef(null);

  async function saveChat() {
    const chatTitle = await sendMessageToGenAI('Name this chat with a user based on the first message: ' + JSON.stringify(chats[0]))
    const newChat = {
      userId: currentUser.uid,
      chats: chats,
      chatTitle: chatTitle,
      date: new Date().toDateString()
    }
    await setDoc(doc(db, 'chats'), newChat)
    setPreviousChats([newChat, ...previousChats])
  }

  async function onSubmit() {
    if (text.trim() === "" || isGenerating) return;

    const userMessage = text;

    // Add user's message AND an empty AI message
    setChats((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "assistant", text: "" },
    ]);

    setText("");
    setIsGenerating(true);

    try {
      await intialRequest(
        JSON.stringify(profileData),
        userMessage,
        chats,
        (chunk) => {
          // Add each streamed chunk to the existing AI message
          setChats((prev) => {
            const updated = [...prev];

            const lastMessage = updated[updated.length - 1];

            updated[updated.length - 1] = {
              ...lastMessage,
              text: lastMessage.text + chunk,
            };

            return updated;
          });
        }
      );
    } catch (error) {
      console.error("AI error:", error);

      setChats((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          text: "Sorry, I couldn't generate a response. Please try again.",
        };

        return updated;
      });
    } finally {
      setIsGenerating(false);
    }
  }

  // Automatically scroll to the bottom as the AI streams
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return;

      const profileSnapshot = await getDoc(
        doc(db, "users", currentUser.uid)
      );

      const data = profileSnapshot.data();

      setProfileName(data.name || "");
      setProfileData(data);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="subpage">
      <Navbar />

      <main className="subpage-content">
        <header className="subpage-header">
          <p className="subpage-eyebrow">Make every class count</p>

          <Typography component="h1" className="subpage-title">
            Academics
          </Typography>

          <p className="subpage-description">
            Track the courses and habits that support the future you are
            building.
          </p>

          <Card
            style={{
              height: "500px",
              display: "flex",
              borderRadius: 20,
            }}
          >
            <CardContent
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Input */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  label="Enter Prompt"
                  disabled={isGenerating}
                  sx={{
                    width: "80%",
                  }}
                />

                <Button
                  disabled={text.trim() === "" || isGenerating}
                  onClick={onSubmit}
                  style={{
                    width: "20%",
                    backgroundColor:
                      text.trim() === "" || isGenerating
                        ? "grey"
                        : "blue",
                    color: "white",
                    height: "50px",
                    marginLeft: "50px",
                  }}
                >
                  {isGenerating ? "Thinking..." : "Submit"}
                </Button>
                <Button variant='text' disabled={chats.length === 0}>
                  Save Chat
                </Button>
              </div>

              {/* Chat */}
              <div
                ref={chatRef}
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "10px 25px",
                  marginTop: "10px",
                }}
              >
                {chats.map((c, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px 14px",
                      border: "1px solid #ddd",
                      borderRadius: "12px",
                      maxWidth: "50%",
                      width: "fit-content",
                      overflowWrap: "anywhere",

                      alignSelf:
                        c.role === "user"
                          ? "flex-end"
                          : "flex-start",

                      backgroundColor:
                        c.role === "user"
                          ? "#D6E9FF"
                          : "white",

                      marginLeft:
                        c.role === "assistant"
                          ? "20px"
                          : "0px",
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </header>
      </main>
    </div>
  );
}

export default Academics;