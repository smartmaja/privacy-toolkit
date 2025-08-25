import HeaderBar from "./components/HeaderBar";
import HealthLoggingTool from "./tools/HealthLoggingTool/HealthLoggingTool";

const ACTIVE_TOOL = <HealthLoggingTool />;

const App = () => (
    <div>
        <div className="header">
            <HeaderBar />
        </div>
        <div className="content">
            {ACTIVE_TOOL}
        </div>
    </div>
);

export default App;
