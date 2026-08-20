import "./SelectType.css"


const opportunityTypes = [
    {
        id: "internship",
        title: "Internships",
        description: "Gain real world experience with organizations near you"
    },
    {
        id: "research",
        title: "Research",
        description: "Work with professsors to create meaningful discoveries"
    },
    {
        id: "competitions",
        title: "Competitions",
        description: "Find event where you can compete"
    },
    {
        id: "volunteering",
        title: "Volunteering",
        description: "Find ways you can give back to your community"
    },
    {
        id: "training",
        title: "Training",
        description: "Discover programs, and trainigns to help you develop new skills"
    }
    
];

export default function SeletType({onSelectType}){
      return (
    <div className="select-type">

      <div className="select-type-header">
        <h1>Find an Opportunity</h1>

        <p>
          What type of opportunity are you looking for?
        </p>
      </div>

      <div className="opportunity-type-grid">

        {opportunityTypes.map((type) => (
          <button
            key={type.id}
            className="opportunity-type-card"
            onClick={() => onSelectType(type.id)}
          >
            <h2>{type.title}</h2>

            <p>{type.description}</p>

            <span className="type-arrow">
              →
            </span>
          </button>
        ))}

      </div>

    </div>
  );
}