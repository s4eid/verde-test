import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./layouts/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { firstPost } from "./redux/actions/post";

function App() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((p) => p.posts);
  console.log(posts.post);
  useEffect(() => {
    const fetch = async () => {
      console.log(posts.post.length);
      if (posts.post.length == 0) {
        console.log("fetched");
        await axios({
          method: "get",
          url: "https://jsonplaceholder.typicode.com/posts",
          responseType: "stream",
        }).then(function (response) {
          console.log(response);
          dispatch(firstPost(response.data));
          setData(response.data);
        });
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <Nav />
      {posts.post.length > 0 ? (
        <div className="flex flex-row justify-center items-center flex-wrap">
          {posts.post.map((p) => {
            return (
              <div
                className="flex flex-col break-words border w-60 h-60 m-5 p-4 rounded-xl justify-around"
                key={p.id}
              >
                <p className="font-bold">{p.title}</p>
                <p>{p.body.substring(0, 70)}...</p>
                <button
                  onClick={() => {
                    history(`post/${p.id}`);
                  }}
                  className="font-bold text-blue-500 text-left"
                >
                  More
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default App;
