import { createContext, useContext } from "react"

export const taskContext = createContext()

export const useTask = () => useContext(taskContext)