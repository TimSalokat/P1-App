
import "../css/Projects.css";

export default function Projects() {
    return (
        <div className="Section column nowrap">
            <label>Projects</label>
            <div className="ProjectContainer stretch">
                <Project/>
                <Project/>
                <Project/>
            </div>
        </div>
    )
}

const Project = () => {
    return (
        <div className="Project">

            <div>
                <label> Project XY</label>
                <label id="PCounter">15</label>
                <Graphic/>
            </div>

            <div className="row">
                <span id="ProgressBar"/>
                <h5>50%</h5>
            </div>
        </div>
    )
}

function Graphic() {
    return (
        <div>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            viewBox="0 0 300 300"
            id="ProjectGraphic"
            >
            <path
                fill="var(--accent-light)"
                strokeWidth="0.6"
                d="M309.72 29.082l.953-41.899-326.619 1.905Q-11.006 150 28.516 157.549c39.521 7.55 44.259-35.045 71.712 14.369 19.044 34.28 46.08 57.445 79.188 57.445 35.66 0 76.269-40.642 84.597-91.726 9.944-60.993 37.468-93.45 45.707-108.555"
                transform="translate(11.006)"
            ></path>
            </svg>

        </div>
    );
  }