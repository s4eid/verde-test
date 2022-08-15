import React, { useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { addPost } from "../../redux/actions/post";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../layouts/Nav";

const NewPost = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  return (
    <>
      <Nav />
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
                //       placeholder={post.title}
              ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">Add Your Post Title</p>
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
                //       placeholder={post?.body}
              ></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">Add Your Post Body</p>
          </div>
          <div className="flex justify-around">
            <button
              type="submit"
              onClick={async () => {
                if (postBody !== "" && postTitle !== "") {
                  await axios({
                    method: "post",
                    url: `https://jsonplaceholder.typicode.com/posts`,
                    data: {
                      body: postBody,
                      title: postTitle,
                      userId: 1,
                    },
                  }).then(function (response) {
                    console.log(response.data);
                    const newUpdate = {
                      title: postTitle,
                      body: postBody,
                      id: response.data.id,
                      userId: response.data.userId,
                    };
                    dispatch(addPost(newUpdate));
                    history("/");
                  });
                }
              }}
              className="bg-blue-500 text-white p-3 rounded-sm font-bold"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
