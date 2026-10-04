import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { ChevronLeft } from "lucide-react";
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
import "./Academics.css";

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
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);

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

      <main className="subpage-content academics-content">
      <header className="subpage-header academics-header">
          <p className="subpage-eyebrow">Make every class count</p>

          <Typography component="h1" className="subpage-title">
            Academics
          </Typography>

          <p className="subpage-description">
            Track the courses and habits that support the future you are building.
          </p>

          <Card className="academics-chat-card">
            <CardContent className="academics-chat-content">
              <div className="academics-chat-heading">
                <div>
                  <p className="academics-chat-eyebrow">Your study space</p>
                  <Typography component="h2" className="academics-chat-title">
                    Study assistant
                  </Typography>
                  <p className="academics-chat-caption">
                    Ask questions, work through a challenge, or pick up where you left off.
                  </p>
                </div>
              </div>

              <div className="academics-chat-toolbar">
                <TextField
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  className="academics-chat-input"
                  label="Ask your study assistant"
                  placeholder="What would you like help with?"
                  disabled={isGenerating}
                />

                <Button
                  disabled={text.trim() === "" || isGenerating}
                  onClick={onSubmit}
                  variant="contained"
                  className="academics-submit-button"
                >
                  {isGenerating ? "Thinking..." : "Submit"}
                </Button>

                <Button
                  variant="outlined"
                  className="academics-save-button"
                  disabled={chats.length === 0 || loading}
                  onClick={saveChat}
                >
                  {currentChatId ? "Update Chat" : "Save Chat"}
                </Button>

                <Button
                  variant="text"
                  className="academics-new-chat-button"
                  onClick={startNewChat}
                >
                  + New
                </Button>
              </div>

              <div
                className={`academics-chat-workspace ${
                  isHistoryCollapsed ? "is-history-collapsed" : ""
                }`}
              >
                <div
                  ref={chatRef}
                  className="academics-chat-messages"
                >
                  {!loading ? (
                    chats.length > 0 ? (
                      chats.map((c, index) => (
                        <div
                          key={index}
                          className={`academics-chat-message ${
                            c.role === "user" ? "is-user" : "is-assistant"
                          }`}
                        >
                          <p>{c.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="academics-chat-empty">
                        <span className="academics-chat-empty-icon" aria-hidden="true">
                          ✦
                        </span>
                        <Typography component="h3">
                          What are you working on?
                        </Typography>
                        <p>
                          Get help understanding a topic, organizing your study plan,
                          or building better academic habits.
                        </p>
                      </div>
                    )
                  ) : (
                    <Loader />
                  )}
                </div>

                <aside className={`academics-chat-history ${isHistoryCollapsed ? "is-collapsed" : ""}`}>
                  <div className="academics-chat-history-header">
                    <Typography component="h3" className="academics-chat-history-title">
                      Previous Chats
                    </Typography>
                    <Button
                      className="academics-chat-history-toggle"
                      onClick={() => setIsHistoryCollapsed((collapsed) => !collapsed)}
                      aria-label={`${isHistoryCollapsed ? "Show" : "Hide"} previous chats`}
                      aria-expanded={!isHistoryCollapsed}
                      aria-controls="academics-chat-history-list"
                      title={`${isHistoryCollapsed ? "Show" : "Hide"} previous chats`}
                    >
                      <ChevronLeft
                        className={`academics-history-icon ${
                          isHistoryCollapsed ? "is-collapsed" : ""
                        }`}
                        size={18}
                        strokeWidth={2.25}
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                  <div
                    id="academics-chat-history-list"
                    className="academics-chat-history-list"
                    hidden={isHistoryCollapsed}
                  >
                    {previousChats.length > 0 ? (
                      previousChats.map((item) => (
                        <Button
                          key={item.id}
                          onClick={() => selectPreviousChat(item)}
                          className={`academics-chat-history-item ${
                            currentChatId === item.id ? "is-active" : ""
                          }`}
                          aria-current={currentChatId === item.id ? "true" : undefined}
                          title={item.chatTitle || "Untitled Chat"}
                        >
                          {item.chatTitle || "Untitled Chat"}
                        </Button>
                      ))
                    ) : (
                      <p className="academics-chat-history-empty">
                        Saved conversations will appear here.
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </CardContent>
          </Card>
        </header>
      </main>
    </div>
  );
}

export default Academics;