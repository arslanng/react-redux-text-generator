import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParagraph } from "./Redux/paragraphSlice";

function App() {
  const [format, setFormat] = useState("text");
  const [number, setNumber] = useState(4);

  const dispatch = useDispatch();

  const {paragraph, isLoading, error} = useSelector((state) => state.paragraph);

  useEffect(() => {
    dispatch(getParagraph(number));
  }, [number, dispatch]);
console.log(paragraph);
  return (
    <>
      <div className="container-fluid text-center bg-secondary-subtle p-4">
        <h1>React sample text generator app</h1>
      </div>
      <div className="container mt-3">
        <div className="row">
          <form>
            <label htmlFor="number">Paragraf Sayısı: </label>
            <input
              className="mx-3"
              type="number"
              name="number"
              id="number"
              min={1}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <label htmlFor="format">Format:</label>
            <select
              name="format"
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="html">html</option>
              <option value="text">text</option>
            </select>
          </form>
        </div>
        <div className="row mt-5">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error Mesage: {error}</div>}
          {paragraph &&
            !isLoading &&
            (format === "text"
              ? paragraph.map((p, i) => <p key={i}>{p}</p>)
              : paragraph.map((p, i) => <p key={i}>&lt;p&gt;{p}&lt;/p&gt;</p>))}
        </div>
      </div>
    </>
  );
}

export default App;
