
import { useEffect, useRef, useState } from "react";
import { courses } from "../../data/courses";
import "./CourseAutoComplete.css";

// =========================================================
// COURSE SEARCH ALIASES
// =========================================================

const aliases = {

  // =========================================================
  // GENERAL
  // =========================================================

  "ap": ["ap"],
  "aps": ["ap"],

  "hon": ["honors"],
  "honors": ["honors"],

  "adv": ["advanced"],
  "advanced": ["advanced"],

  "reg": ["regular"],
  "regular": ["regular"],

  "college": ["college"],
  "dual": ["dual"],
  "de": ["dual enrollment", "dual credit"],


  // =========================================================
  // ENGLISH / LANGUAGE ARTS
  // =========================================================

  "ela": ["english", "language arts"],
  "eng": ["english", "engineering"],
  "engl": ["english"],

  "lit": ["literature"],
  "lang": ["language"],

  "comp": ["composition"],
  "writing": ["writing"],
  "creative writing": ["creative writing"],

  "journ": ["journalism"],

  "speech": ["speech"],
  "public speaking": ["public speaking"],

  "debate": ["debate"],
  "rhetoric": ["rhetoric"],

  "shakespeare": ["shakespeare"],
  "poetry": ["poetry"],

  // AP English

  "ap lang": ["ap", "english", "language"],
  "ap english lang": ["ap", "english", "language"],
  "ap language": ["ap", "english", "language"],

  "ap lit": ["ap", "english", "literature"],
  "ap english lit": ["ap", "english", "literature"],
  "ap literature": ["ap", "english", "literature"],

  "ap seminar": ["ap", "seminar"],
  "seminar": ["seminar"],

  "ap research": ["ap", "research"],


  // =========================================================
  // MATHEMATICS
  // =========================================================

  "math": ["mathematics"],
  "mat": ["mathematics"],
  "maths": ["mathematics"],

  "pre algebra": ["pre algebra"],
  "prealg": ["pre algebra"],

  "alg": ["algebra"],
  "algebra": ["algebra"],

  "alg 1": ["algebra i"],
  "algebra 1": ["algebra i"],
  "alg i": ["algebra i"],

  "alg 2": ["algebra ii"],
  "algebra 2": ["algebra ii"],
  "alg ii": ["algebra ii"],

  "geo": ["geometry", "geography"],
  "geom": ["geometry"],

  "trig": ["trigonometry"],
  "trigonometry": ["trigonometry"],

  "precalc": ["precalculus"],
  "pre calc": ["precalculus"],
  "pre-calculus": ["precalculus"],

  "calc": ["calculus"],
  "calculus": ["calculus"],

  "calc 1": ["calculus i"],
  "calc i": ["calculus i"],

  "calc 2": ["calculus ii"],
  "calc ii": ["calculus ii"],

  "multivariable": ["multivariable calculus"],
  "multivariable calc": ["multivariable calculus"],
  "mvc": ["multivariable calculus"],

  "stats": ["statistics"],
  "stat": ["statistics"],
  "statistics": ["statistics"],

  "prob": ["probability"],
  "probability": ["probability"],

  "linear algebra": ["linear algebra"],
  "lin alg": ["linear algebra"],

  "discrete math": ["discrete mathematics"],
  "discrete": ["discrete mathematics"],

  // AP Math

  "ap calc": ["ap", "calculus"],
  "ap calculus": ["ap", "calculus"],

  "ap calc ab": ["ap", "calculus ab"],
  "calc ab": ["calculus ab"],

  "ap calc bc": ["ap", "calculus bc"],
  "calc bc": ["calculus bc"],

  "ap stats": ["ap", "statistics"],
  "ap statistics": ["ap", "statistics"],

  "ap precalc": ["ap", "precalculus"],
  "ap pre calc": ["ap", "precalculus"],


  // =========================================================
  // SCIENCE
  // =========================================================

  "sci": ["science"],

  "bio": ["biology"],
  "biol": ["biology"],

  "chem": ["chemistry"],

  "phys": ["physics"],

  "earth sci": ["earth science"],
  "earth science": ["earth science"],

  "env sci": ["environmental science"],
  "environmental sci": ["environmental science"],
  "environmental science": ["environmental science"],


  "ecology": ["ecology"],
  "eco": ["ecology"],

  "astronomy": ["astronomy"],
  "astro": ["astronomy"],

  "geology": ["geology"],
  "geo sci": ["geology"],

  "meteorology": ["meteorology"],
  "met": ["meteorology"],

  "oceanography": ["oceanography"],
  "ocean": ["oceanography"],

  "marine bio": ["marine biology"],
  "marine biology": ["marine biology"],

  "anatomy": ["anatomy"],
  "physiology": ["physiology"],
  "anat": ["anatomy"],
  "physio": ["physiology"],

  "forensics": ["forensic"],
  "forensic": ["forensic"],

  "genetics": ["genetics"],
  "gen": ["genetics"],

  "micro": ["microbiology", "microeconomics"],
  "microbiology": ["microbiology"],

  "biotech": ["biotechnology"],
  "biotechnology": ["biotechnology"],

  "zoology": ["zoology"],
  "zoo": ["zoology"],

  "botany": ["botany"],

  // AP Science

  "ap bio": ["ap", "biology"],
  "ap biology": ["ap", "biology"],

  "ap chem": ["ap", "chemistry"],
  "ap chemistry": ["ap", "chemistry"],

  "ap env": ["ap", "environmental"],
  "ap env sci": ["ap", "environmental"],
  "ap environmental": ["ap", "environmental"],
  "ap environmental science": ["ap", "environmental"],

  "ap physics": ["ap", "physics"],
  "ap phys": ["ap", "physics"],

  "ap phys 1": ["ap", "physics 1"],
  "ap physics 1": ["ap", "physics 1"],

  "ap phys 2": ["ap", "physics 2"],
  "ap physics 2": ["ap", "physics 2"],

  "ap physics c": ["ap", "physics c"],


  // =========================================================
  // COMPUTER SCIENCE
  // =========================================================

  "cs": ["computer science"],
  "comp sci": ["computer science"],
  "compsci": ["computer science"],
  "computer sci": ["computer science"],

  "cse": ["computer science", "engineering"],

  "programming": ["programming"],
  "prog": ["programming"],

  "coding": ["programming"],
  "code": ["programming"],

  // Languages

  "py": ["python"],
  "python": ["python"],

  "java": ["java"],

  "cpp": ["c++"],

  "c": ["c programming"],

  "csharp": ["c#"],
  "c sharp": ["c#"],

  "swift": ["swift"],

  "javascript": ["javascript"],
  "js": ["javascript"],

  "typescript": ["typescript"],
  "ts": ["typescript"],

  "html": ["html"],
  "css": ["css"],

  "web": ["web"],
  "web dev": ["web development"],
  "web development": ["web development"],

  "app dev": ["app development"],
  "mobile dev": ["mobile app development"],
  "mobile development": ["mobile app development"],

  "ios": ["ios"],
  "android": ["android"],

  // CS Topics

  "data structures": ["data structures"],
  "ds": ["data structures"],

  "algorithms": ["algorithms"],
  "algo": ["algorithms"],

  "database": ["database"],
  "db": ["database"],

  "networking": ["networking"],
  "networks": ["networking"],
  "network": ["networking"],

  "cyber": ["cybersecurity"],
  "cybersecurity": ["cybersecurity"],

  "security": ["security"],

  "ai": ["artificial intelligence"],
  "artificial intelligence": ["artificial intelligence"],

  "ml": ["machine learning"],
  "machine learning": ["machine learning"],

  "data science": ["data science"],
  "data sci": ["data science"],

  "data analytics": ["data analytics"],
  "analytics": ["data analytics"],

  "game dev": ["game development"],
  "game development": ["game development"],
  "game design": ["game design"],

  "graphics": ["computer graphics", "graphic design"],

  // AP CS

  "ap cs": ["ap", "computer science"],
  "ap comp sci": ["ap", "computer science"],
  "ap compsci": ["ap", "computer science"],

  "ap csa": ["ap", "computer science a"],
  "csa": ["computer science a"],
  "cs a": ["computer science a"],

  "ap csp": ["ap", "computer science principles"],
  "csp": ["computer science principles"],
  "cs principles": ["computer science principles"],

  "ap cybersecurity": ["ap", "cybersecurity"],
  "ap cyber": ["ap", "cybersecurity"],

  "ap networking": ["ap", "networking"],


  // =========================================================
  // ENGINEERING
  // =========================================================

  "engr": ["engineering"],

  "engineering design": ["engineering design"],
  "eng design": ["engineering design"],

  "me": ["mechanical engineering"],
  "mech eng": ["mechanical engineering"],

  "ee": ["electrical engineering"],
  "elec eng": ["electrical engineering"],

  "ce": ["civil engineering"],

  "ae": ["aerospace engineering"],
  "aero": ["aerospace engineering"],
  "aerospace": ["aerospace engineering"],

  "biomed": ["biomedical engineering"],
  "biomedical": ["biomedical engineering", "biomedical"],

  "env eng": ["environmental engineering"],

  "robotics": ["robotics"],
  "robot": ["robotics"],
  "robots": ["robotics"],

  "robotics eng": ["robotics engineering"],

  "mechatronics": ["mechatronics"],

  "electronics": ["electronics"],
  "electronic": ["electronics"],

  "circuits": ["circuit design"],
  "circuit": ["circuit design"],

  "cad": ["cad", "computer aided design"],
  "3d": ["3d"],
  "3d design": ["3d design"],
  "3d modeling": ["3d modeling"],

  "cnc": ["cnc"],
  "manufacturing": ["manufacturing"],

  "architecture": ["architecture"],
  "arch": ["architecture"],

  "construction": ["construction"],

  "automotive": ["automotive technology"],
  "auto": ["automotive technology"],

  "aviation": ["aviation technology"],
  "drone": ["drone technology"],
  "drones": ["drone technology"],


  // =========================================================
  // BUSINESS / FINANCE
  // =========================================================

  "business": ["business"],
  "biz": ["business"],

  "entrepreneurship": ["entrepreneurship"],
  "entrepreneur": ["entrepreneurship"],
  "startup": ["entrepreneurship"],
  "startups": ["entrepreneurship"],

  "marketing": ["marketing"],
  "mktg": ["marketing"],

  "finance": ["finance"],
  "financial": ["finance"],
  "fin": ["finance"],

  "accounting": ["accounting"],
  "acct": ["accounting"],

  "investing": ["investments"],
  "investments": ["investments"],
  "investment": ["investments"],

  "personal finance": ["personal finance"],
  "pfin": ["personal finance"],

  "econ": ["economics"],

  "macro": ["macroeconomics"],

  "management": ["management"],

  "international business": ["international business"],
  "ibusiness": ["international business"],


  // =========================================================
  // SOCIAL STUDIES
  // =========================================================

  "ss": ["social studies"],

  "history": ["history"],
  "hist": ["history"],

  "world history": ["world history"],
  "world hist": ["world history"],
  "wh": ["world history"],

  "us history": ["us history", "united states history"],
  "us hist": ["us history"],
  "ush": ["us history"],
  "u.s. history": ["us history"],

  "american history": ["american history"],

  "euro": ["european history"],
  "european history": ["european history"],

  "geography": ["geography"],

  "human geography": ["human geography"],
  "hum geo": ["human geography"],

  "gov": ["government"],
  "government": ["government"],

  "civics": ["civics"],
  "civic": ["civics"],

  "political science": ["political science"],
  "polisci": ["political science"],
  "pol sci": ["political science"],

  "psych": ["psychology"],
  "psy": ["psychology"],

  "soc": ["sociology"],
  "sociology": ["sociology"],

  "anthro": ["anthropology"],
  "anthropology": ["anthropology"],

  // AP History

  "apush": ["ap", "united states history"],
  "ap us history": ["ap", "united states history"],
  "apushistory": ["ap", "united states history"],

  "ap world": ["ap", "world history"],
  "ap world history": ["ap", "world history"],
  "apwh": ["ap", "world history"],

  "ap euro": ["ap", "european history"],
  "ap european": ["ap", "european history"],
  "apeuro": ["ap", "european history"],

  "ap gov": ["ap", "government"],
  "ap government": ["ap", "government"],
  "apgov": ["ap", "government"],

  "ap psych": ["ap", "psychology"],
  "ap psychology": ["ap", "psychology"],
  "appsych": ["ap", "psychology"],

  "ap human geo": ["ap", "human geography"],
  "aphug": ["ap", "human geography"],
  "ap hug": ["ap", "human geography"],

  "ap macro": ["ap", "macroeconomics"],
  "ap macroeconomics": ["ap", "macroeconomics"],

  "ap micro": ["ap", "microeconomics"],
  "ap microeconomics": ["ap", "microeconomics"],

  "ap african american": ["ap", "african american"],
  "apaas": ["ap", "african american"],


  // =========================================================
  // WORLD LANGUAGES
  // =========================================================

  "spanish": ["spanish"],
  "esp": ["spanish"],
  "span": ["spanish"],

  "french": ["french"],
  "fr": ["french"],

  "german": ["german"],
  "ger": ["german"],

  "italian": ["italian"],
  "ital": ["italian"],

  "chinese": ["chinese"],
  "mandarin": ["mandarin"],
  "mand": ["mandarin"],

  "japanese": ["japanese"],
  "jap": ["japanese"],

  "latin": ["latin"],
  "arabic": ["arabic"],
  "russian": ["russian"],

  "asl": ["american sign language"],
  "sign language": ["american sign language"],

  // AP Languages

  "ap spanish": ["ap", "spanish"],
  "ap french": ["ap", "french"],
  "ap german": ["ap", "german"],
  "ap italian": ["ap", "italian"],
  "ap chinese": ["ap", "chinese"],
  "ap japanese": ["ap", "japanese"],
  "ap latin": ["ap", "latin"],


  // =========================================================
  // ART
  // =========================================================

  "art": ["art"],
  "visual art": ["visual art"],

  "drawing": ["drawing"],
  "paint": ["painting"],
  "painting": ["painting"],

  "sculpture": ["sculpture"],
  "ceramics": ["ceramics"],
  "pottery": ["pottery"],

  "photo": ["photography"],
  "photography": ["photography"],

  "digital art": ["digital art"],
  "graphic design": ["graphic design"],

  "animation": ["animation"],
  "anim": ["animation"],

  "fashion": ["fashion"],
  "fashion design": ["fashion design"],

  "art history": ["art history"],

  // AP Art

  "ap art": ["ap", "art"],
  "ap art history": ["ap", "art history"],
  "ap drawing": ["ap", "drawing"],
  "ap 2d": ["ap", "2d"],
  "ap 3d": ["ap", "3d"],


  // =========================================================
  // MUSIC
  // =========================================================

  "music": ["music"],
  "mus": ["music"],

  "band": ["band"],
  "concert band": ["concert band"],
  "marching band": ["marching band"],
  "marching": ["marching band"],

  "orchestra": ["orchestra"],
  "orch": ["orchestra"],

  "choir": ["choir"],
  "chorus": ["chorus"],

  "jazz": ["jazz"],
  "jazz band": ["jazz band"],

  "guitar": ["guitar"],
  "piano": ["piano"],

  "music theory": ["music theory"],
  "music production": ["music production"],

  "songwriting": ["songwriting"],

  "ap music": ["ap", "music theory"],
  "ap music theory": ["ap", "music theory"],


  // =========================================================
  // THEATER / DANCE
  // =========================================================

  "theater": ["theater"],
  "theatre": ["theatre"],
  "theat": ["theater"],

  "acting": ["acting"],

  "musical theater": ["musical theatre"],
  "musical theatre": ["musical theatre"],

  "stagecraft": ["stagecraft"],
  "tech theater": ["technical theatre"],
  "technical theater": ["technical theatre"],

  "dance": ["dance"],
  "ballet": ["ballet"],
  "modern": ["modern dance"],
  "hip hop": ["hip hop dance"],
  "choreography": ["choreography"],


  // =========================================================
  // HEALTH / PE
  // =========================================================

  "pe": ["physical education"],
  "p.e.": ["physical education"],
  "physical ed": ["physical education"],
  "physical education": ["physical education"],

  "health": ["health"],
  "fitness": ["fitness"],
  "gym": ["physical education"],

  "strength": ["strength and conditioning"],
  "conditioning": ["conditioning"],

  "sports medicine": ["sports medicine"],
  "sports med": ["sports medicine"],

  "nutrition": ["nutrition"],

  "cpr": ["cpr"],
  "first aid": ["first aid"],


  // =========================================================
  // HEALTH SCIENCES
  // =========================================================

  "health science": ["health science"],
  "health sciences": ["health sciences"],

  "med": ["medical"],
  "medical": ["medical"],
  "medicine": ["medical"],

  "med sci": ["medical science"],
  "medical science": ["medical science"],

  "medical terminology": ["medical terminology"],
  "med term": ["medical terminology"],

  "nursing": ["nursing"],
  "nurse": ["nursing"],

  "ems": ["emergency medical services"],
  "emergency medicine": ["emergency medical services"],

  "public health": ["public health"],

  "biomed science": ["biomedical science"],


  // =========================================================
  // ENVIRONMENTAL SCIENCE
  // =========================================================

  "environmental": ["environmental"],

  "environment": ["environmental"],

  "sustainability": ["sustainability"],
  "sustainable": ["sustainability"],

  "climate": ["climate"],
  "climate science": ["climate science"],

  "renewable": ["renewable energy"],
  "renewable energy": ["renewable energy"],

  "conservation": ["conservation"],


  // =========================================================
  // MEDIA / COMMUNICATION
  // =========================================================

  "media": ["media"],
  "media studies": ["media studies"],

  "film": ["film"],
  "film studies": ["film studies"],
  "film production": ["film production"],

  "video": ["video production"],
  "video production": ["video production"],

  "broadcast": ["broadcasting"],
  "broadcasting": ["broadcasting"],

  "podcast": ["podcasting"],
  "podcasting": ["podcasting"],

  "communications": ["communications"],
  "comm": ["communications"],



  // =========================================================
  // LAW / PUBLIC SERVICE
  // =========================================================

  "law": ["law"],
  "legal": ["legal"],
  "legal studies": ["legal studies"],

  "criminal justice": ["criminal justice"],
  "crim": ["criminal justice"],
  "cj": ["criminal justice"],

  "criminology": ["criminology"],

  "mock trial": ["mock trial"],

  "public service": ["public service"],
  "public policy": ["public policy"],


  // =========================================================
  // AGRICULTURE
  // =========================================================

  "ag": ["agriculture"],
  "agri": ["agriculture"],
  "agriculture": ["agriculture"],

  "animal science": ["animal science"],
  "vet": ["veterinary science"],
  "veterinary": ["veterinary science"],

  "horticulture": ["horticulture"],
  "plants": ["plant science"],

  "forestry": ["forestry"],


  // =========================================================
  // TECHNOLOGY
  // =========================================================

  "tech": ["technology"],
  "technology": ["technology"],

  "it": ["information technology"],
  "information technology": ["information technology"],

  "ict": ["information technology"],

  "digital": ["digital"],
  "digital tech": ["digital technology"],

  "3d printing": ["3d printing"],
  "3d print": ["3d printing"],

  "elec": ["electronics"],


  // =========================================================
  // CTE / CAREER
  // =========================================================

  "cte": ["career and technical education"],
  "career tech": ["career and technical education"],
  "career": ["career"],

  "internship": ["internship"],
  "intern": ["internship"],

  "work study": ["work based learning"],
  "work based": ["work based learning"],

  "career readiness": ["career readiness"],


  // =========================================================
  // INTERDISCIPLINARY
  // =========================================================

  "interdisciplinary": ["interdisciplinary"],
  "independent study": ["independent study"],
  "research": ["research"],
  "capstone": ["capstone"],
  "project": ["project"],

  "stem": ["stem"],
  "steam": ["steam"],

  "leadership": ["leadership"],

  "college prep": ["college readiness"],
  "college readiness": ["college readiness"],

  "global studies": ["global studies"],
  "humanities": ["humanities"]
};


// =========================================================
// TEXT NORMALIZATION
// =========================================================

function normalizeText(text) {

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");

}


// =========================================================
// GET SEARCH TERMS
// =========================================================

function getSearchTerms(query) {

  const normalized = normalizeText(query);

  // Exact alias
  if (aliases[normalized]) {

    return [
      normalized,
      ...aliases[normalized]
    ];

  }

  // If the entire query is not an alias,
  // check individual words.
  const words = normalized
    .split(" ")
    .filter(Boolean);

  const searchTerms = [];

  for (const word of words) {

    searchTerms.push(word);

    if (aliases[word]) {

      searchTerms.push(
        ...aliases[word]
      );

    }

  }

  return [
    ...new Set(searchTerms)
  ];

}


// =========================================================
// COURSE MATCH SCORE
// =========================================================

function getMatchScore(course, query) {

  const courseName = normalizeText(course.name);
  const subject = normalizeText(course.subject);
  const type = normalizeText(course.type);

  const searchTerms = getSearchTerms(query);

  let score = 0;


  for (const term of searchTerms) {

    // Course name starts with term
    if (courseName.startsWith(term)) {

      score += 100;

    }

    // Course name contains term
    else if (courseName.includes(term)) {

      score += 60;

    }

    // Subject contains term
    else if (subject.includes(term)) {

      score += 40;

    }

    // Course type contains term
    else if (type.includes(term)) {

      score += 30;

    }

  }


  // Exact query appears in course name
  const normalizedQuery =
    normalizeText(query);

  if (courseName.includes(normalizedQuery)) {

    score += 50;

  }


  // AP boost
  if (
    searchTerms.includes("ap") &&
    course.type.toLowerCase() === "ap"
  ) {

    score += 100;

  }


  return score;

}


// =========================================================
// COURSE AUTOCOMPLETE
// =========================================================

export default function CourseAutocomplete({

  selectedCourses,

  onChange,

  placeholder = "Search for a course..."

}) {

  const [query, setQuery] = useState("");

  const [
    showSuggestions,
    setShowSuggestions
  ] = useState(false);

  const [
    highlightedIndex,
    setHighlightedIndex
  ] = useState(0);


  const containerRef =
    useRef(null);


  // =========================================================
  // SEARCH RESULTS
  // =========================================================

  const searchResults = query.trim()

    ? courses

        .map((course) => ({

          course,

          score: getMatchScore(
            course,
            query
          )

        }))

        .filter(
          (result) =>
            result.score > 0
        )

        .sort(
          (a, b) =>
            b.score - a.score
        )

        .map(
          (result) =>
            result.course
        )

        .slice(0, 8)

    : [];


  // =========================================================
  // CHECK IF COURSE IS SELECTED
  // =========================================================

  function isSelected(course) {

    return selectedCourses.some(
      (selected) =>

        normalizeText(
          selected.name
        ) ===

        normalizeText(
          course.name
        )
    );

  }


  // =========================================================
  // ADD COURSE
  // =========================================================

  function addCourse(course) {

    if (!isSelected(course)) {

      onChange([
        ...selectedCourses,
        course
      ]);

    }

    setQuery("");

    setShowSuggestions(false);

    setHighlightedIndex(0);

  }


  // =========================================================
  // ADD CUSTOM COURSE
  // =========================================================

  function addCustomCourse() {

    const trimmedQuery =
      query.trim();


    if (!trimmedQuery) {
      return;
    }


    const alreadyExists =
      selectedCourses.some(
        (course) =>

          normalizeText(
            course.name
          ) ===

          normalizeText(
            trimmedQuery
          )
      );


    if (!alreadyExists) {

      onChange([

        ...selectedCourses,

        {
          name: trimmedQuery,
          subject: "Custom",
          type: "Custom"
        }

      ]);

    }


    setQuery("");

    setShowSuggestions(false);

    setHighlightedIndex(0);

  }


  // =========================================================
  // REMOVE COURSE
  // =========================================================

  function removeCourse(courseName) {

    onChange(

      selectedCourses.filter(
        (course) =>
          course.name !== courseName
      )

    );

  }


  // =========================================================
  // KEYBOARD NAVIGATION
  // =========================================================

  function handleKeyDown(e) {

    const totalOptions =

      searchResults.length +

      (query.trim() ? 1 : 0);


    if (
      !showSuggestions ||
      totalOptions === 0
    ) {

      return;

    }


    // DOWN

    if (e.key === "ArrowDown") {

      e.preventDefault();

      setHighlightedIndex(
        (current) =>

          current < totalOptions - 1
            ? current + 1
            : 0
      );

    }


    // UP

    else if (e.key === "ArrowUp") {

      e.preventDefault();

      setHighlightedIndex(
        (current) =>

          current > 0
            ? current - 1
            : totalOptions - 1
      );

    }


    // ENTER

    else if (e.key === "Enter") {

      e.preventDefault();


      if (
        highlightedIndex <
        searchResults.length
      ) {

        const course =
          searchResults[
            highlightedIndex
          ];


        if (!isSelected(course)) {

          addCourse(course);

        }

      }

      else {

        addCustomCourse();

      }

    }


    // ESCAPE

    else if (e.key === "Escape") {

      setShowSuggestions(false);

      setHighlightedIndex(0);

    }

  }


  // =========================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {

    function handleClickOutside(event) {

      if (

        containerRef.current &&

        !containerRef.current.contains(
          event.target
        )

      ) {

        setShowSuggestions(false);

      }

    }


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =========================================================
  // UI
  // =========================================================

  return (

    <div
      className="course-autocomplete"
      ref={containerRef}
    >

      <div className="course-input-wrapper">

        <input

          type="text"

          value={query}

          placeholder={placeholder}

          onChange={(e) => {

            setQuery(
              e.target.value
            );

            setHighlightedIndex(0);

            setShowSuggestions(true);

          }}

          onFocus={() => {

            if (query.trim()) {

              setShowSuggestions(
                true
              );

            }

          }}

          onKeyDown={handleKeyDown}

          autoComplete="off"

        />


        {/* =================================================
            SEARCH RESULTS
        ================================================= */}

        {showSuggestions &&
          query.trim() && (

            <div className="course-suggestions">


              {searchResults.length > 0 ? (

                searchResults.map(
                  (course, index) => {

                    const selected =
                      isSelected(course);


                    return (

                      <button

                        type="button"

                        key={
                          `${course.name}-${course.subject}`
                        }

                        className={

                          `course-suggestion

                          ${
                            highlightedIndex === index
                              ? "highlighted"
                              : ""
                          }

                          ${
                            selected
                              ? "already-selected"
                              : ""
                          }`

                        }

                        onMouseEnter={() =>

                          setHighlightedIndex(
                            index
                          )

                        }

                        onClick={() => {

                          if (!selected) {

                            addCourse(
                              course
                            );

                          }

                        }}

                      >

                        <div className="course-result-main">

                          <span className="course-name">

                            {course.name}

                          </span>


                          {selected && (

                            <span className="course-check">

                              ✓

                            </span>

                          )}

                        </div>


                        <div className="course-meta">

                          <span>

                            {course.subject}

                          </span>

                          <span>

                            {course.type}

                          </span>

                        </div>

                      </button>

                    );

                  }

                )

              ) : (

                <div className="no-courses">

                  <p>

                    No matching courses found.

                  </p>

                </div>

              )}


              {/* =================================================
                  CUSTOM COURSE
              ================================================= */}

              <button

                type="button"

                className={

                  `custom-course-option

                  ${
                    highlightedIndex ===
                    searchResults.length

                      ? "highlighted"

                      : ""

                  }`

                }

                onMouseEnter={() =>

                  setHighlightedIndex(
                    searchResults.length
                  )

                }

                onClick={
                  addCustomCourse
                }

              >

                <span className="custom-plus">

                  +

                </span>


                <span>

                  Add "{query.trim()}" manually

                </span>

              </button>


            </div>

          )}

      </div>


      {/* =================================================
          SELECTED COURSES
      ================================================= */}

      {selectedCourses.length > 0 && (

        <div className="selected-courses">

          {selectedCourses.map(
            (course) => (

              <div

                className="course-chip"

                key={
                  `${course.name}-${course.subject}`
                }

              >

                <div className="course-chip-info">

                  <span className="course-chip-name">

                    {course.name}

                  </span>


                  <span className="course-chip-type">

                    {course.subject}
                    {" · "}
                    {course.type}

                  </span>

                </div>


                <button

                  type="button"

                  className="remove-course"

                  onClick={() =>
                    removeCourse(
                      course.name
                    )
                  }

                  aria-label={
                    `Remove ${course.name}`
                  }

                >

                  ×

                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}


