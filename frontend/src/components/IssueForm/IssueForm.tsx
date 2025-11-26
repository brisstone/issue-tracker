import { useState } from "react";
import { TextInput } from "../view/Text/TextInput";

export default function IssueForm() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        stattus: ""
    })
  return (
    <div>
        <form>
            <TextInput
            label="Title"
            value={""}
            />
        </form>
    </div>
  )
}
