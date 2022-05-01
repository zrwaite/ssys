import React from "react";
import "./TeacherCode.css";

function TeacherCode() {
    return(
    <main>
        <div className="teacherCodeTop">
            <h1>Blythe's Page</h1>
            <div className="teacherCodeBlurb">
                <p>This is a page for Blythe. If you are not Blythe, then this page is not for you.</p>
            </div>
        </div>
        <div className="teacherCodeBody">
            <div className="teacherCodeBoxBox">
                <label></label>
                <input className="teacherCodeBox" placeholder="PASSWORD" type={"text"}/>
            </div>
            <div className="teacherCodeCenter">
                    <button className="teacherCodeSubmit">Submit</button>
            </div>
        </div>
    </main>
    );
}

export default TeacherCode;
