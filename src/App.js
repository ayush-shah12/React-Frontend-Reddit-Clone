// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import { ModelContextProvider } from './context/ModelContext.jsx';
import { ViewContextProvider } from './context/ViewContext.jsx';
import Wrapper from './Wrapper.jsx';

// Notes: <App/> can't be here since I can't deal with ViewContext here since its also defined here
// To avoid all this unneccessary stuff index.jsx should be have <App/> wrapped with these providers, but not allowed to change index.jsx

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
