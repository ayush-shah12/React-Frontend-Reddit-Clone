// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import { ModelContextProvider } from './context/ModelContext.jsx';
import { ViewContextProvider } from './context/ViewContext.jsx';
import Wrapper from './Wrapper.jsx';

function App() {

  return (
    <ViewContextProvider>
      <ModelContextProvider>
        <Wrapper/> 
      </ModelContextProvider>
    </ViewContextProvider>
  );
}

export default App;
