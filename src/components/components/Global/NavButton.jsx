import { useNavigate } from "react-router-dom";

function NavigateButton({text, destination}) {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(destination)}>
            {text}
        </button>
    );
}

export default NavigateButton;