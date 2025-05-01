import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { Textarea } from "../components/ui/textarea";
import ShowTodo from "../components/ShowTodo";

const Home = () => {
  const [todos, setTodos] = useState({ title: "", description: "" });
  const [refresh, setRefresh] = useState(false); // to trigger re-fetch in ShowTodo

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  console.log("BASE_URL", BASE_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/todos`, todos, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setTodos({ title: "", description: "" }); // clear input
        setRefresh((prev) => !prev); // toggle to trigger re-fetch
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="grid space-y-10 grid-cols-1 xl:grid-cols-2 px-4 sm:px-8 md:px-12 lg:px-16">
      <form onSubmit={handleSubmit} className="space-y-4 w-full xl:max-w-md">
        <Input
          type="text"
          placeholder="Title"
          value={todos.title}
          onChange={(e) => setTodos({ ...todos, title: e.target.value })}
        />

        <Textarea
          placeholder="Description"
          value={todos.description}
          onChange={(e) => setTodos({ ...todos, description: e.target.value })}
        />

        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </form>

      <ShowTodo refresh={refresh} />
    </div>
  );
};

export default Home;
