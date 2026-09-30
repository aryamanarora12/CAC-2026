import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Navbar from "../components/components/Global/Navbar";
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  updateDoc, 
  where 
} from "firebase/firestore";
import { intialRequest } from "../chatbotfunctions";
import Loader from "../components/components/Global/Loader";

function Academics() {
  const auth = getAuth();
  const [profileName, setProfileName] = useState("");
  const [profileData, setProfileData] = useState({});
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null); // Track active chat ID
  const [isGenerating, setIsGenerating] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  // Save or update current chat
  async function saveChat() {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      const firstMessage = chats.find((c) => c.role === "user")?.text || "New Chat";
      const chatTitle = firstMessage.length > 25 ? firstMessage.substring(0, 25) + "..." : firstMessage;

      if (currentChatId) {
        // Update existing document
        const chatDocRef = doc(db, "chats", currentChatId);
        await updateDoc(chatDocRef, {
          chats: chats,
          updatedAt: new Date().toISOString(),
        });

        setPreviousChats((prev) =>
          prev.map((c) => (c.id === currentChatId ? { ...c, chats: chats } : c))
        );
      } else {
        // Create new document
        const newChatPayload = {
          userId: user.uid,
          chats: chats,
          chatTitle: chatTitle,
          createdAt: new Date().toISOString(),
        };

        const docRef = await addDoc(collection(db, "chats"), newChatPayload);
        const createdChat = { id: docRef.id, ...newChatPayload };

        setCurrentChatId(docRef.id);
        setPreviousChats((prev) => [createdChat, ...prev]);
      }
    } catch (error) {
      console.error("Error saving chat:", error);
    } finally {
      setLoading(false);
    }
  }

  // Load selected previous chat into workspace
  function selectPreviousChat(savedChat) {
    setCurrentChatId(savedChat.id);
    setChats(savedChat.chats || []);
  }

  // Start a new fresh chat session
  function startNewChat() {
    setCurrentChatId(null);
    setChats([]);
    setText("");
  }

  async function onSubmit() {
    if (text.trim() === "" || isGenerating) return;

    const userMessage = text;

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

  // Scroll to bottom on updates
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  // Auth & profile loader
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return;

      const profileSnapshot = await getDoc(
        doc(db, "users", currentUser.uid)
      );

      const data = profileSnapshot.data();
      if (data) {
        setProfileName(data.name || "");
        setProfileData(data);
      }

      // Fetch user's previous chats once authenticated
      fetchPreviousChats(currentUser.uid);
    });

    return unsubscribe;
  }, []);

  const fetchPreviousChats = async (userId) => {
    setLoading(true);
    try {
      const chatsRef = collection(db, "chats");
      const userChatsQuery = query(chatsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userChatsQuery);

      const fetchedChats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPreviousChats(fetchedChats);
    } catch (error) {
      console.error("Error fetching chats from Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

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
            Track the courses and habits that support the future you are building.
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
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header Inputs */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <TextField
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  label="Enter Prompt"
                  disabled={isGenerating}
                  sx={{ flex: 1 }}
                />

                <Button
                  disabled={text.trim() === "" || isGenerating}
                  onClick={onSubmit}
                  style={{
                    backgroundColor:
                      text.trim() === "" || isGenerating ? "grey" : "blue",
                    color: "white",
                    height: "50px",
                  }}
                >
                  {isGenerating ? "Thinking..." : "Submit"}
                </Button>

                <Button
                  variant="outlined"
                  disabled={chats.length === 0 || loading}
                  onClick={saveChat}
                  style={{ height: "50px" }}
                >
                  {currentChatId ? "Update Chat" : "Save Chat"}
                </Button>

                <Button
                  variant="text"
                  onClick={startNewChat}
                  style={{ height: "50px" }}
                >
                  + New
                </Button>
              </div>

              {/* Chat View & Previous Chats Sidebar */}
              <div style={{ display: "flex", flex: 1, marginTop: "15px", overflow: "hidden" }}>
                {/* Active Chat Container */}
                <div
                  ref={chatRef}
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "10px 15px",
                  }}
                >
                  {!loading ? (
                    chats.map((c, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "10px 14px",
                          border: "1px solid #ddd",
                          borderRadius: "12px",
                          maxWidth: "65%",
                          width: "fit-content",
                          overflowWrap: "anywhere",
                          alignSelf:
                            c.role === "user" ? "flex-end" : "flex-start",
                          backgroundColor:
                            c.role === "user" ? "#D6E9FF" : "#F4F6F8",
                        }}
                      >
                        <p style={{ margin: 0 }}>{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <Loader />
                  )}
                </div>

                {/* Previous Chats Drawer */}
                <div
                  style={{
                    width: "250px",
                    borderLeft: "1px solid #ddd",
                    padding: "10px",
                    overflowY: "auto",
                  }}
                >
                  <Typography variant="h6" style={{ fontSize: "16px", fontWeight: "bold" }}>
                    Previous Chats
                  </Typography>
                  <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {previousChats.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => selectPreviousChat(item)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "8px",
                          backgroundColor: currentChatId === item.id ? "#e0e0e0" : "#f9f9f9",
                          cursor: "pointer",
                          border: "1px solid #eee",
                        }}
                      >
                        <Typography variant="body2" style={{ fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.chatTitle || "Untitled Chat"}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>
      </main>
    </div>
  );
}

export default Academics;