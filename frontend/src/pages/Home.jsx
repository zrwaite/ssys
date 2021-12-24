import React from "react";
import "../styles/styles.css";
import "../styles/home.css";

function Home() {
    return (
        <main>
            <div class="layout">
                <div class="top">
                    <h2>Leading the Eco-revolution</h2>
                </div>
                <div class="countdown">
                    <div class="registrationcountdown">
                        <p>Registration countdown</p>
                    </div>
                    <div class="conferencecountdown">
                        <p>summit countdown</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;