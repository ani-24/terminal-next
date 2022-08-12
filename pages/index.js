import React, { createElement, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const introduction = [
  "Hello, My name is <b>Aniket Kumar</b>",
  "I am a young, creative full-stack web developer.",
  "Press: ",
  "- 'p' to view my projects",
  "- 's' to see my skills",
  "- 'a' to know about me",
  "or",
  "- 'c' to contact me",
];

const skills = [
  "1. HTML 5",
  "2. CSS 3",
  "3. Sass",
  "4. Bootstrap 4 / 5",
  "5. Materialize CSS",
  "6. Tailwind CSS",
  "7. Vanilla JS",
  "8. React JS",
  "9. Next JS",
  "10. PHP",
  "11. MySQL",
  "12. NodeJS",
  "13. Express",
  "14. MongoDB",
  "15. Mongoose",
  "16. Firebase",
  "What else would you like to see?",
];

const isTouchDevice = () => {
  if (typeof window !== "undefined") {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
};

export default function Home() {
  const terminalRef = useRef(null);
  const charIndex = useRef(0);
  const sentIndex = useRef(0);
  const [start, setStart] = useState(false);
  let music;
  const typeSpeed = 80;
  let p;
  const type = (sentences) => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    if (charIndex.current === 0) {
      p = document.createElement("p");
      setTimeout(() => {
        terminalRef.current.appendChild(p);
      }, 10);
    }
    if (charIndex.current <= sentences[sentIndex.current].length - 1) {
      p.innerHTML += sentences[sentIndex.current].charAt(charIndex.current);
      charIndex.current = charIndex.current + 1;
      console.log(charIndex.current);
      setTimeout(() => {
        type(sentences);
      }, typeSpeed);
    } else if (sentIndex.current < sentences.length - 1) {
      charIndex.current = 0;
      sentIndex.current++;
      setTimeout(() => {
        type(sentences);
      }, typeSpeed * 2);
    } else {
      music.pause();
      p = document.createElement("p");
      p.classList.add("user-input");
      terminalRef.current.appendChild(p);
      const task = (ltr) => {
        if (ltr == "w" || ltr == "W") {
          alert("Works");
        } else if (ltr == "s" || ltr == "S") {
          p.classList.add("value-recieved");
          p.innerHTML = ltr;
          sentIndex.current = 0;
          charIndex.current = 0;
          setTimeout(() => {
            type(skills);
          }, typeSpeed * 2);
          music.currentTime = 0;
          music.play();
        }
      };
      if (isTouchDevice()) {
        const input = document.createElement("input");
        input.setAttribute(
          "style",
          "display: inline-block; background: transparent; outline: none; border: none; font-family: inherit; color: lightgreen; width: 1ch; caret-color: transparent"
        );
        input.maxLength = 1;
        p.appendChild(input);
        input.focus();
        input.addEventListener("input", () => {
          input.style.width = input.value.length + 1 + "ch";
          task(input.value);
        });
      } else {
        window.addEventListener("keydown", (key) => {
          task(key.key);
        });
      }
    }
  };
  useEffect(() => {
    music = new Audio("./typing.wav");
    if (!isTouchDevice()) {
      if (!start) {
        terminalRef.current.innerHTML =
          "<p class='blink'>Press space to continue</p>";
        window.addEventListener("keydown", (key) => {
          if (key.key === " ") {
            type(introduction);
            terminalRef.current.innerHTML = "";
            music.play();
            setStart((prev) => !prev);
          }
        });
      }
    } else {
      if (!start) {
        terminalRef.current.innerHTML =
          "<p class='blink'>Touch the screen to continue</p>";
        window.addEventListener("click", () => {
          type(introduction);
          terminalRef.current.innerHTML = "";
          music.play();
          setStart((prev) => !prev);
        });
      }
    }
  }, []);

  return (
    <>
      <div className="terminal" ref={terminalRef}></div>
    </>
  );
}
