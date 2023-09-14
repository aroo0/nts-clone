import { Toaster } from "react-hot-toast"

const ToasterProvider = () => {
  return (
    <Toaster
    position="bottom-center"
    toastOptions={{
      className: "",
      style: {
        border: "1px solid #fff",
        padding: "16px",
        color: "#fff",
        backgroundColor: "#000",
        borderRadius: "0px"
      },
    }}
  />
  )
}

export default ToasterProvider