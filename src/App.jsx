import Slider from './Slider';
import Info from './Information';
import JobList from './JobList';
import './App.css';

const App = () => {
  return (
    <div className="appContainer">
      <Slider />
      <Info />
      <div className="vacancyList">
        <JobList />
      </div>
    </div>
  );
};

export default App;
