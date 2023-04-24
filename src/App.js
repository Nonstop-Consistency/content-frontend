import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [content, setContent] = useState("");
  useEffect(() => {
    async function getApiData() {
      const response = await fetch(
        process.env.REACT_APP_API_ADDRESS + "/content"
      );
      const responseData = await response.json();
      setData(responseData);
    }
    getApiData();
  }, []);

  const postContent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_ADDRESS + "/content", {
        content,
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Tugas App Engine</h1>
      <div>Data dari API:</div>
      <div>{data !== undefined && data.map((d) => <div>{d.content}</div>)}</div>
      <form onSubmit={postContent}>
        <div className="field">
          <label className="label">Isi content</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
            />
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
