import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../layouts/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deletePost, updatePost } from "../../redux/actions/post";
import { useDispatch, useSelector } from "react-redux";

const Post = () => {
  const post_id = useParams();
  const id = post_id.postId;
  const [post, setPost] = useState({});
  const allP = useSelector((p) => p.posts);
  const recentP = allP.post.find((p) => p.id == id);
  const dispatch = useDispatch();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  useEffect(() => {
    if (allP.post.length == 0) {
      const fetch = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}`
          );
          setPost(data);
          setPostTitle(data.title);
          setPostBody(data.body);
          setLoading(false);
        } catch {
          console.log("error");
        }
      };
      fetch();
    } else {
      setPost(recentP);
      setPostTitle(recentP.title);
      setPostBody(recentP.body);
    }
  }, [id]);
  return (
    <>
      <Nav />
      {/* {!loading ? ( */}
      <div className="flex justify-center items-centeri gap-5 flex-col m-10 p-2 mt-20">
        <h2 className="font-bold text-xl">Post</h2>
        <div className="flex justify-center flex-col text-left gap-3">
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div class="mt-1">
              <textarea
                required
                value={postTitle}
                onChange={(e) => {
                  setPostTitle(e.target.value);
                }}
                id="about"
                name="about"
                rows="3"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder={post.title}
              ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">Edit Your Post Title</p>
          </div>
          <div>
            <label
              for="about"
              className="block text-sm font-medium text-gray-700"
            >
              Detail
            </label>
            <div className="mt-1">
              <textarea
                required
                value={postBody}
                onChange={(e) => {
                  setPostBody(e.target.value);
                }}
                id="about"
                name="about"
                rows="3"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder={post?.body}
              ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">Edit Your Post Body</p>
          </div>
          <div className="flex justify-around">
            <button
              onClick={async () => {
                if (postBody !== "" && postTitle !== "") {
                  await axios({
                    method: "put",
                    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
                    data: {
                      id: post?.id,
                      body: postBody,
                      title: postTitle,
                      id: post?.userId,
                    },
                  }).then(function (response) {
                    const newUpdate = {
                      title: postTitle,
                      body: postBody,
                      id: id,
                      userId: post.userId,
                    };
                    dispatch(updatePost(newUpdate));
                    history("/");
                  });
                }
              }}
              className="bg-blue-500 text-white p-3 rounded-sm font-bold"
            >
              Update
            </button>
            <button
              onClick={async () => {
                await axios({
                  method: "delete",
                  url: `https://jsonplaceholder.typicode.com/posts/${id}`,
                }).then(function (response) {
                  dispatch(deletePost(id));
                  console.log(response);
                  history("/");
                });
              }}
              className="bg-red-500 text-white p-3 rounded-sm font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* ) : ( */}
      {/* <p>Loading...</p> */}
      {/* )} */}
    </>
  );
};

export default Post;
