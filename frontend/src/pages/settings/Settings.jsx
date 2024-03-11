import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:8000/images/";

    const handleDelete = async(e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                // there should come a popup to confirm wheather to delete account or not if i click yes then the below command axios.delete should work

                await axios.delete(`/users/${user._id}`, {
                    data: { userId: user._id },
                });
                dispatch({ type: "LOGOUT" });
                window.location.replace("/");
            } catch (err) {
                console.log("error is", err);
            }
        } else {
            console.log("not deleted");
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("username is", username, email, password);
        dispatch({ type: "UPDATE_START" });
        setSuccess(true);
        console.log("file is", file);
        const updatedUser = {
            userId: user._id,
            username: username || user.username,
            email: email || user.email,
            password: password || user.password
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            // console.log("res is", res.data);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            console.log("error is", err);
            dispatch({ type: "UPDATE_FAILURE" });
        }
        setTimeout(function() {
            setSuccess(false);
        }, 2500);
    };
    return ( <
        div className = "settings" >
        <
        div className = "settingsWrapper" >
        <
        div className = "settingsTitle" >
        <
        span className = "settingsUpdateTitle" > Update Your Account < /span>{" "} <
        span className = "settingsDeleteTitle"
        onClick = { handleDelete } > { " " }
        Delete Account { " " } <
        /span>{" "} < /
        div > { " " } <
        form className = "settingsForm"
        onSubmit = { handleSubmit } >
        <
        label > Profile Picture < /label>{" "} <
        div className = "settingsPP" >
        <
        img src = { file ? URL.createObjectURL(file) : PF + user.profilePic }
        alt = "" /
        >
        <
        label htmlFor = "fileInput" >
        <
        i className = "settingsPPIcon fa-regular fa-circle-user" > < /i>{" "} < /
        label > { " " } <
        input type = "file"
        id = "fileInput"
        style = {
            { display: "none" }
        }
        onChange = {
            (e) => {
                console.log("working", user);
                console.log(e.target.files[0]);
                setFile(e.target.files[0]);
            }
        }
        />{" "} < /
        div > { " " } <
        label > Username < /label>{" "} <
        input type = "text"
        placeholder = { user.username }
        onChange = {
            (e) => {
                setUsername(e.target.value);
            }
        }
        />{" "} <
        label > Email < /label>{" "} <
        input type = "email"
        placeholder = { user.email }
        onChange = {
            (e) => {
                setEmail(e.target.value);
            }
        }
        />{" "} <
        label > Password < /label>{" "} <
        input type = "password"
        placeholder = "Enter Password"
        onChange = {
            (e) => {
                setPassword(e.target.value);
            }
        }
        />{" "} <
        button className = "settingsSubmit"
        type = "submit" > { " " }
        Update { " " } <
        /button>{" "} < /
        form > { " " } {
            success && ( <
                h3 style = {
                    { color: "green", textAlign: "center" }
                } > { " " }
                User Details Updated Successfully... { " " } <
                /h3>
            )
        } { " " } <
        /div>{" "} <
        Sidebar / >
        <
        /div>
    );
}