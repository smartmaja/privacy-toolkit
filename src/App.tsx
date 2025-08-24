import HeaderBar from "./components/HeaderBar";
import HealthLoggingTool from "./tools/HealthLoggingTool/HealthLoggingTool";

const App = () => (
    <div>
        <div className="header">
            <HeaderBar />
        </div>
        <div className="content">
            <HealthLoggingTool />
        </div>
    </div>
);

export default App;
