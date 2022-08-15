import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const Nav = () => {
  const post = useSelector((p) => p.posts);
  return (
    <div className="container flex-wrap  mx-auto bg-gray-200 rounded-xl shadow border p-2 m-10 flex flex-row justify-around items-center">
      <div className="flex justify-start gap-6">
        <Link to={"/"}>
          <p className="text-1x1 w-24 bg-black p-3 rounded-2xl text-white border font-bold  text-center">
            Home
          </p>
        </Link>
        <Link to={"/new"}>
          <p className="text-1x1 w-24 bg-black p-3 rounded-2xl text-white border font-bold  text-center">
            Add Post
          </p>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-end w-1/2 gap-10">
        <p className="font-bold border border-black p-2 rounded-md">
          posts {post.post.length}
        </p>
        <img
          class="inline-block h-20 w-20 rounded-full ring-2 ring-white "
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Nav;
