import Header from "./components/Header"
import Form from "./components/Form"
import TaskProvider from "./context/TaskProvider"
import "./index.css"
function App() {


  return (
    <TaskProvider>
      <Header/>
      <Form/>
    </TaskProvider>
  )
}

export default App
