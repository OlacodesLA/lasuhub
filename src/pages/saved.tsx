//@ts-nocheck
import React, { useState } from "react";

function TagsInput() {
  const [tags, setTags] = useState([]);
  const todoList = [
    { title: "item 1", isDone: false },
    { title: "item 2", isDone: true },
  ];

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
    console.log("tags: " + tags);
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }
  const onCodeChange = (event) => {
    console.log("onCodeChange: " + event.currentTarget.textContent);
  };

  function TodoItem({ title, isDone }) {
    return (
      <span
        contentEditable="true"
        style={{ color: isDone ? "green" : "red" }}
        value={title}
        onInput={onCodeChange}
      >
        {title}
      </span>
    );
  }

  function Todo(props) {
    const todoList = props.todoList.map((el) => (
      <TodoItem key={el.id} title={el.title} isDone={el.isDone} />
    ));
    return <p className="tags-input-container">{todoList}</p>;
  }
  function ColorfulText({ children }) {
    return <span style={{ color: "green" }}>{children}</span>;
  }

  const [text, setText] = useState(["Your test sentence"]);

  const targetWord = "red";
  // used to split the text at target word but keep the target word
  // in the returned array
  const regex = new RegExp(`(${targetWord})`);

  return (
    <React.Fragment>
      <div className="tags-input-container">
        {tags.map((tag, index) => (
          <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}
        <input
          onKeyDown={handleKeyDown}
          type="text"
          className="tags-input"
          placeholder="Type something and Press Enter"
        />
      </div>
      <div>
        <code contentEditable="true" suppressContentEditableWarning={true}>
          {tags.map((tag) => {
            <span style={{ color: "orange" }}>{tag}</span>;
          })}
        </code>
      </div>
      <Todo todoList={todoList} />

      <div>
        <p
          contentEditable="true"
          style={{ fontSize: "2rem" }}
          onBlur={(e) => {
            setText([...e.target.textContent.split(regex)]);
          }}
        >
          {text.map((words) => {
            if (words === targetWord) {
              return <ColorfulText>{words}</ColorfulText>;
            } else {
              return words;
            }
          })}
        </p>
      </div>
    </React.Fragment>
  );
}

export default TagsInput;